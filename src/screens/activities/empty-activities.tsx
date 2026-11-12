import Lucide from "@react-native-vector-icons/lucide"
import { Text, View } from "react-native"

import { colors } from "@/colors"

export function EmptyActivities() {
  return (
    <View className="items-center justify-center flex-1 gap-4 hidden">
      <Lucide
        name="list"
        size={24}
        color={colors.gray[400]}
      />

      <Text className="max-w-36 text-center text-gray-400 text-sm font-inter">
        Você ainda não tem atividades criadas
      </Text>
    </View>
  )
}
