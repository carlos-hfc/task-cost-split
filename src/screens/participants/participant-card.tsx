import { Text, View } from "react-native"

interface ParticipantCardProps {
  name: string
  activityAmount: number
}

export function ParticipantCard({
  activityAmount,
  name,
}: ParticipantCardProps) {
  const initials = name
    .split(" ")
    .map(item => item.charAt(0))
    .join("")

  return (
    <View className="border border-gray-600 rounded-lg p-3 gap-4 flex-row">
      <View className="rounded-full bg-gray-600 items-center justify-center size-10">
        <Text className="text-gray-200 font-sora text-sm">{initials}</Text>
      </View>

      <View className="gap-1">
        <Text className="text-gray-100 font-inter text-base">{name}</Text>
        <Text className="text-gray-400 font-inter text-sm">
          Em {activityAmount} atividade(s)
        </Text>
      </View>
    </View>
  )
}
