import { Text, View } from "react-native"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { ExpenseStatus } from "@/components/expense-status"
import { SelectStatus } from "@/components/select-status"
import { currencyFormatter } from "@/utils/currency-formatter"

export function ExpenseDetailsSheet() {
  return (
    <>
      <View className="gap-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-gray-300 text-sm font-inter">
            2 participantes
          </Text>

          <ExpenseStatus type="partial" />
        </View>

        <View className="border-y border-gray-600 py-4 gap-5">
          <View className="flex-row justify-between gap-4 items-center">
            <Avatar initials="CF" />

            <View className="flex-1">
              <Text className="text-gray-200 text-base font-inter-semibold">
                Carlos Faustino
              </Text>
              <Text className="text-gray-300 text-sm font-inter">
                {currencyFormatter.format(1100)}
              </Text>
            </View>

            <SelectStatus />
          </View>

          <View className="flex-row justify-between gap-4 items-center">
            <Avatar initials="CF" />

            <View className="flex-1">
              <Text className="text-gray-200 text-base font-inter-semibold">
                Carlos Faustino
              </Text>
              <Text className="text-gray-300 text-sm font-inter">
                {currencyFormatter.format(1100)}
              </Text>
            </View>

            <SelectStatus />
          </View>
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
