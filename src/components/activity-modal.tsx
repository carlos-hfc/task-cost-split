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
import { addActivity } from "@/http/add-activity"
import { GetUserActivitiesResponse } from "@/http/get-user-activities"
import { queryClient } from "@/lib/react-query"

import { Button } from "./button"
import { DatePicker } from "./date-picker"
import { Input } from "./input"
import { Loading } from "./loading"

interface ActivityModalProps {
  visible: boolean
  onClose(): void
  title: string
}

const addActivitySchema = z.object({
  title: z
    .string("O título é obrigatório")
    .min(3, "O título deve ter pelo menos 3 caracteres")
    .trim(),
  activityDate: z.date("A data é obrigatória").min(new Date()),
})

type AddActivitySchema = z.infer<typeof addActivitySchema>

export function ActivityModal({ visible, onClose, title }: ActivityModalProps) {
  const { toggleLoading, loading } = useAuthContext()
  const { handleError } = useAppError()

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AddActivitySchema>({
    resolver: zodResolver(addActivitySchema),
    defaultValues: {
      activityDate: undefined,
    },
  })

  const { mutateAsync: addActivityFn } = useMutation({
    mutationFn: addActivity,
    onSuccess(data) {
      queryClient.setQueriesData<GetUserActivitiesResponse>(
        {
          queryKey: ["user-activities"],
        },
        cachedData => {
          if (!cachedData) return

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

      reset()
    },
  })

  async function handleAddActivity(data: AddActivitySchema) {
    toggleLoading(true, true)

    try {
      await addActivityFn(data)
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
                />
              )}
            />
          </View>

          <Button
            disabled={isSubmitting}
            onPress={() => handleSubmit(handleAddActivity)()}
          >
            Salvar
          </Button>
        </View>
      </View>

      {loading && <Loading />}
    </Modal>
  )
}
