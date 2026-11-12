import clsx from "clsx"
import { Text, View } from "react-native"

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
  const viewVariant = clsx({
    "bg-danger-low": type === "pending",
    "bg-alert-low": type === "partial",
    "bg-success-low": type === "paid",
  })

  const textVariant = clsx({
    "text-danger-light": type === "pending",
    "text-alert-light": type === "partial",
    "text-success-light": type === "paid",
  })

  return (
    <View
      className={clsx(
        "px-2 rounded-lg items-center justify-center h-6",
        viewVariant,
      )}
    >
      <Text className={clsx("text-xs font-inter", textVariant)}>
        {expenseStatusMap[type]}
      </Text>
    </View>
  )
}
