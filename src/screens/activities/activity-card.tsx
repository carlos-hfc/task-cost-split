import Lucide from "@react-native-vector-icons/lucide"
import { useNavigation } from "@react-navigation/native"
import { Text, TouchableOpacity, View } from "react-native"

import { colors } from "@/colors"
import { currencyFormatter } from "@/utils/currency-formatter"

interface ActivityCardProps {
  id: string
  name: string
  activityDate: Date
  totalAmountInCents: number
  participantsAmount: number
  expensesAmount: number
}

export function ActivityCard({
  activityDate,
  expensesAmount,
  participantsAmount,
  name,
  totalAmountInCents,
  id,
}: ActivityCardProps) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("activities", { screen: "details", params: { id } })
      }
      className="p-4 gap-3 rounded-lg border border-gray-600 bg-gray-700"
    >
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-100 font-inter-semibold text-base">
          {name}
        </Text>
        <Text className="text-gray-200 font-inter text-sm">
          {currencyFormatter.format(totalAmountInCents / 100)}
        </Text>
      </View>

      <View className="flex-row gap-3 border-t border-gray-600 pt-4">
        <View className="flex-row gap-2 items-center">
          <Lucide
            name="calendar"
            color={colors.gray[400]}
            size={16}
          />
          <Text className="text-gray-400 font-inter text-sm">
            {new Date(activityDate).toLocaleDateString("pt-br")}
          </Text>
        </View>

        <View className="flex-row gap-2 items-center">
          <Lucide
            name="users"
            color={colors.gray[400]}
            size={16}
          />
          <Text className="text-gray-400 font-inter text-sm">
            {participantsAmount} pessoa(s)
          </Text>
        </View>

        <View className="flex-row gap-2 items-center">
          <Lucide
            name="circle-dollar-sign"
            color={colors.gray[400]}
            size={16}
          />
          <Text className="text-gray-400 font-inter text-sm">
            {expensesAmount} despesa(s)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
