import { ActivityIndicator, Image, View } from "react-native"

import { colors } from "@/colors"
import { cn } from "@/utils/cn"

interface LoadingProps {
  className?: string
}

export function Loading({ className }: LoadingProps) {
  return (
    <View
      className={cn(
        "flex-1 items-center justify-center absolute z-10 inset-0 bg-black/50 gap-5",
        className,
      )}
    >
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
