import { ActivityIndicator, Image, View } from "react-native"

import { colors } from "@/colors"

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center absolute z-10 inset-0 bg-black/50 gap-5">
      <Image
        source={require("@/assets/logo.png")}
        alt="Logo TaskCost Split"
        className="size-32"
      />

      <ActivityIndicator
        size={"large"}
        color={colors.green.base}
      />
    </View>
  )
}
