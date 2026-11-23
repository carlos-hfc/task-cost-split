import { zodResolver } from "@hookform/resolvers/zod"
import Lucide from "@react-native-vector-icons/lucide"
import { useMutation } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import {
  Keyboard,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import z from "zod"

import { colors } from "@/colors"
import { useAuthContext } from "@/contexts/auth-context"
import { useAppError } from "@/hooks/use-app-error"
import { addActivity, AddActivityResponse } from "@/http/add-activity"
import { GetActivityResponse } from "@/http/get-activity"
import { GetUserActivitiesResponse } from "@/http/get-user-activities"
import { GetUserResumeResponse } from "@/http/get-user-resume"
import { updateActivity } from "@/http/update-activity"
import { queryClient } from "@/lib/react-query"
import { cn } from "@/utils/cn"

import { Button } from "./button"
import { DatePicker } from "./date-picker"
import { Input } from "./input"
import { Loading } from "./loading"

interface ActivityModalProps {
  visible: boolean
  onClose(): void
  title: string
  defaultValues?: {
    id: string
    title: string
    activityDate: Date
  }
}

const activitySchema = z
  .object({
    title: z
      .string("O título é obrigatório")
      .min(3, "O título deve ter pelo menos 3 caracteres")
      .trim(),
    activityDate: z.date("A data é obrigatória"),
    id: z.string().optional(),
  })
  .superRefine((args, context) => {
    if (!args.id && args.activityDate < new Date()) {
      context.addIssue({
        code: "custom",
        message: "A data não pode ser no passado",
        path: ["activityDate"],
      })
    }
  })

type ActivitySchema = z.infer<typeof activitySchema>

export function ActivityModal({
  visible,
  onClose,
  title,
  defaultValues,
}: ActivityModalProps) {
  const { toggleLoading, loading } = useAuthContext()
  const { handleError } = useAppError()

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ActivitySchema>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      ...defaultValues,
      activityDate: defaultValues?.activityDate
        ? new Date(defaultValues.activityDate)
        : undefined,
    },
  })

  const IS_EDIT = defaultValues?.id

  const { mutateAsync: addActivityFn } = useMutation({
    mutationFn: addActivity,
    onSuccess(data) {
      updateCache(data)

      reset()
      onClose()
    },
  })

  const { mutateAsync: updateActivityFn } = useMutation({
    mutationFn: updateActivity,
    onSuccess(data) {
      updateCache(data)

      onClose()
    },
  })

  function updateCache(data: AddActivityResponse) {
    queryClient.setQueriesData<GetUserActivitiesResponse>(
      {
        queryKey: ["user-activities"],
      },
      cachedData => {
        if (!cachedData) return

        if (IS_EDIT) {
          return {
            ...cachedData,
            activities: cachedData.activities.map(item => {
              if (item.id === defaultValues.id) {
                return {
                  ...item,
                  ...data,
                }
              }

              return item
            }),
          }
        }

        return {
          ...cachedData,
          activities: [
            ...cachedData.activities,
            {
              ...data,
              participants: [],
              participantsAmount: 1,
              totalAmountInCents: 0,
              expensesAmount: 0,
            },
          ],
        }
      },
    )

    queryClient.setQueryData<GetActivityResponse>(
      ["activities", defaultValues?.id],
      cachedData => {
        if (!cachedData) return

        return { ...cachedData, ...data }
      },
    )

    if (!IS_EDIT) {
      queryClient.setQueryData<GetUserResumeResponse>(
        ["user-resume"],
        cachedData => {
          if (!cachedData) return

          return {
            ...cachedData,
            activitiesCount: cachedData.activitiesCount + 1,
          }
        },
      )
    }
  }

  async function handleStoreActivity(data: ActivitySchema) {
    toggleLoading(true, true)

    try {
      if (IS_EDIT) {
        await updateActivityFn({
          activityId: defaultValues.id,
          ...data,
        })
      } else {
        await addActivityFn(data)
      }
    } catch (error) {
      handleError(error)
    } finally {
      toggleLoading(false)
    }
  }

  function handleBackdropPress() {
    if (Keyboard.isVisible()) return Keyboard.dismiss()

    reset()

    onClose()
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={handleBackdropPress}
      backdropColor={""}
    >
      <View className="flex-1 justify-center px-4">
        <Pressable
          onPress={handleBackdropPress}
          className="px-4 absolute inset-0"
        />

        <View className="bg-gray-700 rounded-lg p-6 w-full gap-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-100 font-inter-semibold text-base">
              {title}
            </Text>

            <TouchableOpacity onPress={handleBackdropPress}>
              <Lucide
                name="x"
                color={colors.gray[300]}
                size={16}
              />
            </TouchableOpacity>
          </View>

          <View className="gap-2">
            <Controller
              control={control}
              name="title"
              render={({ field, fieldState }) => (
                <Input
                  placeholder="Título"
                  value={field.value}
                  onChangeText={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="activityDate"
              render={({ field, fieldState }) => (
                <DatePicker
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Data"
                  error={fieldState.error?.message}
                  minDate={defaultValues?.id ? undefined : new Date()}
                />
              )}
            />
          </View>

          <View className="flex-row justify-between gap-2">
            {IS_EDIT && (
              <Button
                disabled={isSubmitting}
                icon="trash"
                variant="danger"
              />
            )}

            <Button
              disabled={isSubmitting}
              onPress={() => handleSubmit(handleStoreActivity)()}
              className={cn(!IS_EDIT && "flex-1")}
            >
              Salvar
            </Button>
          </View>
        </View>
      </View>

      {loading && <Loading />}
    </Modal>
  )
}
