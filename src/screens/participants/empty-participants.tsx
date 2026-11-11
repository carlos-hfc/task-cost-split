import Lucide from "@react-native-vector-icons/lucide"
import { Text, View } from "react-native"

import { colors } from "@/colors"

export function EmptyParticipants() {
  return (
    <View className="items-center justify-center flex-1 gap-4">
      <Lucide
        name="users"
        size={24}
        color={colors.gray[400]}
      />

      <Text className="max-w-44 text-center text-gray-400 text-sm font-inter">
        Você ainda não adicionou participantes em atividades
      </Text>
    </View>
  )
}
