import { Text, View } from "react-native"

import { ExpenseStatus } from "./expense-status"

export function SelectStatus() {
  return (
    <View className="flex-row items-center border border-gray-600 bg-gray-800 rounded-lg p-1">
      <Text className="px-2 text-gray-300 text-xs font-inter">Pendente</Text>
      <ExpenseStatus type="paid" />
    </View>
  )
}
