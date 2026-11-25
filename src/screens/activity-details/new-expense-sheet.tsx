import { zodResolver } from "@hookform/resolvers/zod"
import Lucide from "@react-native-vector-icons/lucide"
import { RouteProp, useRoute } from "@react-navigation/native"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { Text, TouchableOpacity, View } from "react-native"
import z from "zod"

import { ActivityStackParamsList } from "@/@types/navigation"
import { colors } from "@/colors"
import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { ExpenseStatusType } from "@/components/expense-status"
import { Input } from "@/components/input"
import { Select } from "@/components/select"
import { useAuthContext } from "@/contexts/auth-context"
import { useSnackbarContext } from "@/contexts/snackbar-context"
import { addExpense } from "@/http/add-expense"
import { GetActivityResponse } from "@/http/get-activity"
import { getAllUsers } from "@/http/get-all-users"
import { GetUserActivitiesResponse } from "@/http/get-user-activities"
import { queryClient } from "@/lib/react-query"

interface NewExpenseSheetProps {
  onClose(): void
}

const newExpenseSchema = z.object({
  title: z
    .string("O título é obrigatório")
    .min(3, "O título deve ter pelo menos 3 caracteres")
    .trim(),
  amountInCents: z
    .number("O valor é obrigatório")
    .min(0.01, "O valor deve ser maior que zero"),
  participantsIds: z
    .array(
      z.string("Os participantes são obrigatórios"),
      "Os participantes são obrigatórios",
    )
    .nonempty("Os participantes são obrigatórios"),
})

type NewExpenseSchema = z.infer<typeof newExpenseSchema>

export function NewExpenseSheet({ onClose }: NewExpenseSheetProps) {
  const {
    params: { id: activityId },
  } = useRoute<RouteProp<ActivityStackParamsList, "details">>()

  const { user } = useAuthContext()
  const { notify } = useSnackbarContext()

  const { control, handleSubmit } = useForm<NewExpenseSchema>({
    resolver: zodResolver(newExpenseSchema),
  })

  const { data, isLoading } = useQuery({
    queryKey: ["participants"],
    queryFn: getAllUsers,
    select: data => ({
      users: data.users.filter(item => item.id !== user?.id),
    }),
  })

  const { mutateAsync: addExpenseFn, isPending } = useMutation({
    mutationFn: addExpense,
    onSuccess(data) {
      onClose()

      queryClient.setQueryData<GetActivityResponse>(
        ["activities", activityId],
        cachedData => {
          if (!cachedData) return

          const participants = Array.from(
            new Map(
              [
                ...data.participants.map(item => ({
                  id: item.userId,
                  name: item.userName,
                  email: "",
                  createdAt: new Date(),
                })),
                ...cachedData.participants,
              ].map(item => [item.id, item]),
            ).values(),
          ).sort((a, b) => a.name.localeCompare(b.name))

          return {
            ...cachedData,
            totalAmountInCents:
              cachedData.totalAmountInCents + data.amountInCents,
            participants,
            expenses: [
              ...cachedData.expenses,
              {
                ...data,
                paymentStatus: "pending" as ExpenseStatusType,
                participants: participants
                  .map(item => ({
                    ...item,
                    paymentStatus: "pending" as ExpenseStatusType,
                  }))
                  .sort((a, b) => a.name.localeCompare(b.name)),
              },
            ],
          }
        },
      )

      queryClient.setQueriesData<GetUserActivitiesResponse>(
        {
          queryKey: ["user-activities"],
        },
        cachedData => {
          if (!cachedData) return

          return {
            ...cachedData,
            activities: cachedData.activities.map(item => {
              if (item.id === data.activityId) {
                const participantsAmount = new Set([
                  item.participants,
                  ...data.participants.map(item => ({
                    id: item.userId,
                    name: item.userName,
                    email: "",
                    createdAt: new Date(),
                  })),
                ])

                return {
                  ...item,
                  totalAmountInCents:
                    item.totalAmountInCents + data.amountInCents,
                  expensesAmount: item.expensesAmount + 1,
                  participantsAmount: participantsAmount.size,
                }
              }

              return item
            }),
          }
        },
      )

      notify({
        message: "Despesa adiciona com sucesso!",
        type: "success",
      })
    },
  })

  async function handleCreateExpense(data: NewExpenseSchema) {
    await addExpenseFn({
      ...data,
      activityId,
      payerId: user?.id ?? "",
      amountInCents: parseInt(String(data.amountInCents * 100)),
      participantsIds: [...data.participantsIds, user?.id ?? ""],
    })
  }

  const options = data?.users.map(user => ({
    label: user.name,
    value: user.id,
  }))

  return (
    <>
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
          name="amountInCents"
          render={({ field, fieldState }) => (
            <Input
              currency
              placeholder="Valor"
              value={field.value}
              onChangeValue={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />

        {isLoading ? (
          <View className="animate-pulse w-full h-12 bg-zinc-800 rounded-lg" />
        ) : (
          <Controller
            control={control}
            name="participantsIds"
            render={({ field, fieldState }) => (
              <>
                <Select
                  icon="users"
                  placeholder={
                    field.value?.length > 0
                      ? `${field.value.length.toString()} participante(s)`
                      : "Participantes"
                  }
                  options={options ?? []}
                  value={field.value ?? []}
                  onValueChange={field.onChange}
                  error={fieldState.error?.message}
                />

                <View className="gap-3">
                  {options
                    ?.filter(option => field.value?.includes(option.value))
                    ?.map(user => (
                      <View
                        key={user.value}
                        className="flex-row items-center gap-3"
                      >
                        <Avatar
                          name={user.label}
                          size="md"
                        />
                        <Text className="flex-1 text-gray-200 text-base font-inter-semibold">
                          {user.label}
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            field.onChange(
                              field.value?.includes(user.value)
                                ? field.value.filter(
                                    item => item !== user.value,
                                  )
                                : field.value,
                            )
                          }
                        >
                          <Lucide
                            name="trash"
                            size={16}
                            color={colors.danger.light}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                </View>
              </>
            )}
          />
        )}
      </View>

      <Button
        disabled={isPending}
        onPress={() => handleSubmit(handleCreateExpense)()}
      >
        Salvar
      </Button>
    </>
  )
}
