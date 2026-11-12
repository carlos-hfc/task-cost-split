import Lucide from "@react-native-vector-icons/lucide"
import { useNavigation } from "@react-navigation/native"
import { Text, TouchableOpacity, View } from "react-native"

import { colors } from "@/colors"
import { currencyFormatter } from "@/utils/currency-formatter"

interface ActivityCardProps {
  title: string
  date: string
  value: number
  participants: number
  expenses: number
}

export function ActivityCard({
  date,
  expenses,
  participants,
  title,
  value,
}: ActivityCardProps) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("activities", { screen: "details" })}
      className="p-4 gap-3 rounded-lg border border-gray-600 bg-gray-700"
    >
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-100 font-inter-semibold text-base">
          {title}
        </Text>
        <Text className="text-gray-200 font-inter text-sm">
          {currencyFormatter.format(value)}
        </Text>
      </View>

      <View className="flex-row gap-3 border-t border-gray-600 pt-4">
        <View className="flex-row gap-2 items-center">
          <Lucide
            name="calendar"
            color={colors.gray[400]}
            size={16}
          />
          <Text className="text-gray-400 font-inter text-sm">{date}</Text>
        </View>

        <View className="flex-row gap-2 items-center">
          <Lucide
            name="users"
            color={colors.gray[400]}
            size={16}
          />
          <Text className="text-gray-400 font-inter text-sm">
            {participants} pessoa(s)
          </Text>
        </View>

        <View className="flex-row gap-2 items-center">
          <Lucide
            name="circle-dollar-sign"
            color={colors.gray[400]}
            size={16}
          />
          <Text className="text-gray-400 font-inter text-sm">
            {expenses} despesa(s)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
