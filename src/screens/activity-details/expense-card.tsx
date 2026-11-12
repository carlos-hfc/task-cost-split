import clsx from "clsx"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { Avatar } from "@/components/avatar"
import { BottomSheet } from "@/components/bottom-sheet"
import { ExpenseStatus } from "@/components/expense-status"
import { currencyFormatter } from "@/utils/currency-formatter"

import { ExpenseDetailsSheet } from "./expense-details-sheet"

export function ExpenseCard() {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false)

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setIsOpenBottomSheet(true)}
      className="border border-gray-600 bg-gray-700 rounded-lg p-4 gap-3"
    >
      <View className="flex-row justify-between gap-2">
        <Text className="text-gray-100 text-base font-inter-semibold">
          Aluguel da casa
        </Text>

        <View className="gap-0.5">
          <Text className="text-gray-200 text-sm font-inter text-right">
            {currencyFormatter.format(2200)}
          </Text>
          <Text className="text-gray-300 text-xs font-inter text-right">
            {currencyFormatter.format(1100)}/pessoa
          </Text>
        </View>
      </View>

      <View className="flex-row items-end justify-between gap-2 border-t border-gray-600 pt-3">
        <View className="flex-row">
          {Array.from({ length: 10 })
            .slice(0, 6)
            .map((_, i) => (
              <Avatar
                key={i}
                initials="JS"
                size="sm"
                className={clsx("border border-gray-700", i !== 0 && "-ml-2")}
              />
            ))}
        </View>

        <ExpenseStatus type="paid" />
      </View>

      <BottomSheet
        onClose={() => setIsOpenBottomSheet(false)}
        open={isOpenBottomSheet}
        titleComponent={
          <View className="gap-1">
            <Text className="text-gray-100 text-xl font-inter-semibold">
              Aluguel da casa
            </Text>

            <Text className="text-green-light text-base font-inter-semibold">
              {currencyFormatter.format(2200)}
            </Text>
          </View>
        }
      >
        <ExpenseDetailsSheet />
      </BottomSheet>
    </TouchableOpacity>
  )
}
