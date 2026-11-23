import { Text, TouchableOpacity } from "react-native"

import { ExpenseStatus, ExpenseStatusType } from "./expense-status"

interface SelectStatusProps {
  status: ExpenseStatusType
}

export function SelectStatus({ status }: SelectStatusProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="flex-row items-center border border-gray-600 bg-gray-800 rounded-lg p-1"
    >
      {status === "paid" && (
        <Text className="px-2 text-gray-300 text-xs font-inter order-2">
          Pendente
        </Text>
      )}

      <ExpenseStatus type={status} />

      {status === "pending" && (
        <Text className="px-2 text-gray-300 text-xs font-inter order-2">
          Pago
        </Text>
      )}
    </TouchableOpacity>
  )
}
