import { useQuery } from "@tanstack/react-query"
import { Text, View } from "react-native"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { ExpenseStatus } from "@/components/expense-status"
import { SelectStatus } from "@/components/select-status"
import { getExpense } from "@/http/get-expense"
import { currencyFormatter } from "@/utils/currency-formatter"

interface ExpenseDetailsSheetProps {
  expenseId: string
}

export function ExpenseDetailsSheet({ expenseId }: ExpenseDetailsSheetProps) {
  const { data } = useQuery({
    queryKey: ["expenses", expenseId],
    queryFn: () => getExpense({ expenseId }),
  })

  const amountPaidInCents =
    (data &&
      data?.payments.length > 0 &&
      data?.payments.reduce((acc, current) => {
        acc += current.amountPaidInCents

        return acc
      }, 0)) ||
    0

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

              <SelectStatus status={participant.paymentStatus} />
            </View>
          ))}
        </View>
      </View>

      <View className="flex-row justify-between items-center">
        <Button
          icon="trash"
          variant="danger"
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
