import Lucide, { LucideIconName } from "@react-native-vector-icons/lucide"
import { Text, View } from "react-native"

import { colors } from "@/colors"

interface SummaryResumeProps {
  icon: LucideIconName
  amount: number
  text: string
}

export function SummaryResume({ amount, icon, text }: SummaryResumeProps) {
  return (
    <View className="p-3 gap-1 border border-gray-600 rounded-lg flex-1">
      <Lucide
        name={icon}
        size={16}
        color={colors.green.light}
        style={{ position: "absolute", top: 8, right: 8 }}
      />

      <Text className="text-gray-200 font-sora text-xl">
        {amount.toString().padStart(2, "0")}
      </Text>

      <Text className="text-gray-300 font-inter text-xs">{text}</Text>
    </View>
  )
}
