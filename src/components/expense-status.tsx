import { Text, View } from "react-native"

import { cn } from "@/utils/cn"

export type ExpenseStatusType = "pending" | "paid" | "partial"

interface ExpenseStatusProps {
  type: ExpenseStatusType
}

const expenseStatusMap: Record<ExpenseStatusType, string> = {
  paid: "Pago",
  partial: "Parcial",
  pending: "Pendente",
}

export function ExpenseStatus({ type }: ExpenseStatusProps) {
  const viewVariant = {
    pending: "bg-danger-low",
    partial: "bg-alert-low",
    paid: "bg-success-low",
  }[type]

  const textVariant = {
    pending: "text-danger-light",
    partial: "text-alert-light",
    paid: "text-success-light",
  }[type]

  return (
    <View
      className={cn(
        "px-2 rounded-lg items-center justify-center h-6",
        viewVariant,
      )}
    >
      <Text className={cn("text-xs font-inter", textVariant)}>
        {expenseStatusMap[type]}
      </Text>
    </View>
  )
}
