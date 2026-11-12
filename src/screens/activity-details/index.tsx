import clsx from "clsx"
import { useState } from "react"
import { FlatList, Text, View } from "react-native"

import { Avatar } from "@/components/avatar"
import { BottomSheet } from "@/components/bottom-sheet"
import { Button } from "@/components/button"
import { currencyFormatter } from "@/utils/currency-formatter"

import { DetailsHeader } from "./details-header"
import { ExpenseCard } from "./expense-card"
import { NewExpenseSheet } from "./new-expense-sheet"

export function ActivityDetails() {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false)

  return (
    <>
      <View className="gap-6 flex-1">
        <DetailsHeader />

        <View className="flex-row items-end justify-between">
          <View className="gap-1">
            <View className="flex-row">
              {Array.from({ length: 10 })
                .slice(0, 6)
                .map((_, i) => (
                  <Avatar
                    key={i}
                    initials="JS"
                    size="sm"
                    className={clsx(
                      "border border-gray-800",
                      i !== 0 && "-ml-2",
                    )}
                  />
                ))}
            </View>

            <Text className="text-gray-400 text-sm font-inter">
              8 participantes
            </Text>
          </View>

          <View className="gap-1">
            <Text className="text-green-light text-base font-inter-semibold text-right">
              {currencyFormatter.format(4500)}
            </Text>
            <Text className="text-gray-400 text-sm font-inter text-right">
              Gastos totais
            </Text>
          </View>
        </View>

        <View className="gap-3 flex-1">
          <View className="flex-row items-center justify-between gap-2">
            <Text className="text-gray-200 text-base font-inter-semibold">
              Despesas
            </Text>
            <Text className="text-gray-400 text-sm font-inter">3</Text>
          </View>

          <FlatList
            data={Array.from({ length: 10 })}
            renderItem={() => <ExpenseCard />}
            contentContainerClassName="gap-2"
          />
        </View>
      </View>

      <Button
        activeOpacity={0.8}
        icon="plus"
        className="absolute bottom-6 right-6"
        onPress={() => setIsOpenBottomSheet(true)}
      >
        Nova
      </Button>

      <BottomSheet
        onClose={() => setIsOpenBottomSheet(false)}
        open={isOpenBottomSheet}
        title="Nova despesa"
      >
        <NewExpenseSheet />
      </BottomSheet>
    </>
  )
}
