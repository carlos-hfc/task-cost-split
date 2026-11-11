import Lucide from "@react-native-vector-icons/lucide"
import { Text, View } from "react-native"

import { colors } from "@/colors"
import { Button } from "@/components/button"

export function EmptySummary() {
  return (
    <View className="items-center justify-center flex-1 gap-4">
      <Lucide
        name="chart-pie"
        color={colors.gray[400]}
        size={24}
      />

      <Text className="max-w-44 text-center text-gray-400 text-sm font-inter">
        Para começar a acompanhar, crie uma atividade
      </Text>

      <Button
        icon="plus"
        className="max-w-48"
      >
        Criar atividade
      </Button>
    </View>
  )
}
