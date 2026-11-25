import { Text, TouchableOpacity, View } from "react-native"

import { User } from "@/@types/user"
import { Avatar } from "@/components/avatar"
import { ExpenseStatus, ExpenseStatusType } from "@/components/expense-status"
import { cn } from "@/utils/cn"
import { currencyFormatter } from "@/utils/currency-formatter"

interface ExpenseCardProps {
  id: string
  name: string
  paymentStatus: ExpenseStatusType
  amountInCents: number
  participants: User[]
  onPress?(): void
}

export function ExpenseCard({
  amountInCents,
  name,
  participants,
  paymentStatus,
  id,
  onPress,
}: ExpenseCardProps) {
  const amount = amountInCents / 100
  const amountPerPerson = amount / participants.length

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
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
    </TouchableOpacity>
  )
}
