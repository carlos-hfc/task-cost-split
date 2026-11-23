import { useMutation, useQuery } from "@tanstack/react-query"
import { Text, View } from "react-native"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { ExpenseStatus } from "@/components/expense-status"
import { Loading } from "@/components/loading"
import { SelectStatus } from "@/components/select-status"
import { useSnackbarContext } from "@/contexts/snackbar-context"
import { deleteExpense } from "@/http/delete-expense"
import { GetActivityResponse } from "@/http/get-activity"
import { getExpense, GetExpenseResponse } from "@/http/get-expense"
import { toggleExpenseStatus } from "@/http/toggle-expense-status"
import { queryClient } from "@/lib/react-query"
import { currencyFormatter } from "@/utils/currency-formatter"

interface ExpenseDetailsSheetProps {
  expenseId: string
}

export function ExpenseDetailsSheet({ expenseId }: ExpenseDetailsSheetProps) {
  const { notify } = useSnackbarContext()

  const { data, isLoading } = useQuery({
    queryKey: ["expenses", expenseId],
    queryFn: () => getExpense({ expenseId }),
  })

  const {
    mutateAsync: toggleExpenseStatusFn,
    isPending: isPendingToggleExpenseStatus,
  } = useMutation({
    mutationFn: toggleExpenseStatus,
    onSuccess({
      paymentStatus,
      participantId,
      participantName,
      amountPaidInCents,
      amountOwedInCents,
      remainingDebtInCents,
    }) {
      queryClient.setQueryData<GetExpenseResponse>(
        ["expenses", expenseId],
        cachedData => {
          if (!cachedData) return

          const participants = cachedData.participants.map(participant => {
            if (participant.userId === participantId) {
              return {
                ...participant,
                paymentStatus,
                amountPaidInCents,
                amountOwedInCents,
                remainingDebtInCents,
              }
            }

            return participant
          })

          const paymentExists = cachedData.payments.some(
            payment => payment.debtorId === participantId,
          )

          const payments = paymentExists
            ? cachedData.payments.map(payment => {
                if (payment.debtorId === participantId) {
                  return { ...payment, amountPaidInCents }
                }

                return payment
              })
            : [
                ...cachedData.payments,
                {
                  id: `${expenseId}-${participantId}`,
                  debtorId: participantId,
                  debtorName: participantName,
                  amountPaidInCents,
                  paidAt: new Date(),
                },
              ]

          return {
            ...cachedData,
            participants,
            payments,
          }
        },
      )

      queryClient.setQueryData<GetActivityResponse>(
        ["activities", data?.activityId],
        cachedData => {
          if (!cachedData) return

          return {
            ...cachedData,
            expenses: cachedData.expenses.map(item => {
              if (item.id === expenseId) {
                const participants = item.participants.map(participant => {
                  if (participant.id === participantId) {
                    return {
                      ...participant,
                      paymentStatus,
                    }
                  }

                  return participant
                })

                const statuses = participants.map(
                  participant => participant.paymentStatus,
                )

                const expenseStatus =
                  statuses.length === 0 ||
                  statuses.every(status => status === "pending")
                    ? "pending"
                    : statuses.every(status => status === "paid")
                      ? "paid"
                      : "partial"

                return {
                  ...item,
                  participants,
                  paymentStatus: expenseStatus,
                }
              }

              return item
            }),
          }
        },
      )

      notify({
        message: "Status da despesa atualizado com sucesso!",
        type: "success",
      })
    },
  })

  const { mutateAsync: deleteExpenseFn, isPending: isPendingDeleteExpense } =
    useMutation({
      mutationFn: deleteExpense,
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["expenses", expenseId] })

        queryClient.setQueryData<GetActivityResponse>(
          ["activities", data?.activityId],
          cachedData => {
            if (!cachedData) return

            return {
              ...cachedData,
              expenses: cachedData.expenses.filter(
                item => item.id !== expenseId,
              ),
              totalAmountInCents:
                cachedData.totalAmountInCents - (data?.amountInCents ?? 0),
            }
          },
        )

        notify({
          message: "Despesa excluída com sucesso!",
          type: "success",
        })
      },
    })

  const amountPaidInCents =
    (data &&
      data?.payments.length > 0 &&
      data?.payments.reduce((acc, current) => {
        acc += current.amountPaidInCents

        return acc
      }, 0)) ||
    0

  if (isLoading) {
    return (
      <View className="h-80">
        <Loading className="bg-transparent" />
      </View>
    )
  }

  if (!data) return null

  return (
    <>
      <View className="gap-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-gray-300 text-sm font-inter">
            {data.participants.length} participante(s)
          </Text>

          <ExpenseStatus
            type={
              amountPaidInCents === 0
                ? "pending"
                : amountPaidInCents < data.amountInCents
                  ? "partial"
                  : "paid"
            }
          />
        </View>

        <View className="border-y border-gray-600 py-4 gap-5">
          {data.participants.map(participant => (
            <View
              key={participant.userId}
              className="flex-row justify-between gap-4 items-center"
            >
              <Avatar name={participant.name} />

              <View className="flex-1">
                <Text className="text-gray-200 text-base font-inter-semibold">
                  {participant.name}
                </Text>
                <Text className="text-gray-300 text-sm font-inter">
                  {currencyFormatter.format(
                    participant.amountOwedInCents / 100,
                  )}
                </Text>
              </View>

              <SelectStatus
                status={participant.paymentStatus}
                disabled={isPendingToggleExpenseStatus}
                onPress={() =>
                  toggleExpenseStatusFn({
                    expenseId,
                    participantId: participant.userId,
                  })
                }
              />
            </View>
          ))}
        </View>
      </View>

      <View className="flex-row justify-between items-center">
        <Button
          icon="trash"
          variant="danger"
          disabled={isPendingDeleteExpense}
          onPress={() => deleteExpenseFn({ expenseId })}
        />

        <Button
          icon="pencil"
          variant="secondary"
        >
          Editar
        </Button>
      </View>
    </>
  )
}
