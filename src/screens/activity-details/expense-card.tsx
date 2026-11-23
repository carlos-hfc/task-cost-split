import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { User } from "@/@types/user"
import { Avatar } from "@/components/avatar"
import { BottomSheet } from "@/components/bottom-sheet"
import { ExpenseStatus, ExpenseStatusType } from "@/components/expense-status"
import { cn } from "@/utils/cn"
import { currencyFormatter } from "@/utils/currency-formatter"

import { ExpenseDetailsSheet } from "./expense-details-sheet"

interface ExpenseCardProps {
  name: string
  paymentStatus: ExpenseStatusType
  amountInCents: number
  participants: User[]
}

export function ExpenseCard({
  amountInCents,
  name,
  participants,
  paymentStatus,
}: ExpenseCardProps) {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false)

  const amount = amountInCents / 100
  const amountPerPerson = amount / participants.length

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setIsOpenBottomSheet(true)}
      className="border border-gray-600 bg-gray-700 rounded-lg p-4 gap-3"
    >
      <View className="flex-row justify-between gap-2">
        <Text className="text-gray-100 text-base font-inter-semibold">
          {name}
        </Text>

        <View className="gap-0.5">
          <Text className="text-gray-200 text-sm font-inter text-right">
            {currencyFormatter.format(amount)}
          </Text>
          <Text className="text-gray-300 text-xs font-inter text-right">
            {currencyFormatter.format(amountPerPerson)}/pessoa
          </Text>
        </View>
      </View>

      <View className="flex-row items-end justify-between gap-2 border-t border-gray-600 pt-3">
        <View className="flex-row">
          {participants.slice(0, 6).map((participant, i) => (
            <Avatar
              key={participant.id}
              name={participant.name}
              size="sm"
              className={cn("border border-gray-700", i !== 0 && "-ml-2")}
            />
          ))}
        </View>

        <ExpenseStatus type={paymentStatus} />
      </View>

      <BottomSheet
        onClose={() => setIsOpenBottomSheet(false)}
        open={isOpenBottomSheet}
        titleComponent={
          <View className="gap-1">
            <Text className="text-gray-100 text-xl font-inter-semibold">
              {name}
            </Text>

            <Text className="text-green-light text-base font-inter-semibold">
              {currencyFormatter.format(amount)}
            </Text>
          </View>
        }
      >
        <ExpenseDetailsSheet />
      </BottomSheet>
    </TouchableOpacity>
  )
}
