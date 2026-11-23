import Lucide from "@react-native-vector-icons/lucide"
import { useState } from "react"
import { Text, View } from "react-native"

import { colors } from "@/colors"
import { BottomSheet } from "@/components/bottom-sheet"
import { Button } from "@/components/button"

import { NewExpenseSheet } from "./new-expense-sheet"

export function EmptyExpenses() {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false)

  return (
    <View className="items-center justify-center flex-1 gap-4">
      <Lucide
        name="chart-pie"
        color={colors.gray[400]}
        size={24}
      />

      <Text className="max-w-44 text-center text-gray-400 text-sm font-inter">
        Para começar a dividir, registre uma despesa
      </Text>

      <Button
        icon="plus"
        className="max-w-48"
      >
        Nova despesa
      </Button>

      <BottomSheet
        onClose={() => setIsOpenBottomSheet(false)}
        open={isOpenBottomSheet}
        titleComponent={
          <Text className="text-gray-100 text-base font-inter-semibold">
            Nova despesa
          </Text>
        }
      >
        <NewExpenseSheet />
      </BottomSheet>
    </View>
  )
}
