import { Text, View } from "react-native"

import { Avatar } from "@/components/avatar"

interface ParticipantCardProps {
  name: string
  activityAmount: number
}

export function ParticipantCard({
  activityAmount,
  name,
}: ParticipantCardProps) {
  return (
    <View className="border border-gray-600 rounded-lg p-3 gap-4 flex-row">
      <Avatar name={name} />

      <View className="gap-1">
        <Text className="text-gray-100 font-inter text-base">{name}</Text>
        <Text className="text-gray-400 font-inter text-sm">
          Em {activityAmount} atividade(s)
        </Text>
      </View>
    </View>
  )
}
