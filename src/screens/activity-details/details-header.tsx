import Lucide from "@react-native-vector-icons/lucide"
import { useNavigation } from "@react-navigation/native"
import { Text, TouchableOpacity, View } from "react-native"

import { colors } from "@/colors"
import { Button } from "@/components/button"

export function DetailsHeader() {
  const navigation = useNavigation()

  return (
    <View className="flex-row gap-2 justify-between">
      <View className="gap-3">
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-row items-center gap-1"
          onPress={() => navigation.goBack()}
        >
          <Lucide
            name="arrow-left"
            color={colors.green.light}
            size={16}
          />
          <Text className="text-green-light text-sm font-inter">Voltar</Text>
        </TouchableOpacity>

        <View className="gap-1">
          <Text className="text-gray-100 text-xl font-inter-semibold">
            Férias de verão
          </Text>

          <View className="flex-row gap-2 items-center">
            <Lucide
              name="calendar"
              size={16}
              color={colors.gray[300]}
            />
            <Text className="text-gray-300 text-sm font-inter">12/12/12</Text>
          </View>
        </View>
      </View>

      <Button
        icon="pencil"
        variant="secondary"
      />
    </View>
  )
}
