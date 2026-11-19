import { Text, View } from "react-native"

import { cn } from "@/utils/cn"

type AvatarSize = "sm" | "md" | "lg"

interface AvatarProps {
  initials: string
  size?: AvatarSize
  className?: string
}

export function Avatar({ initials, size = "lg", className }: AvatarProps) {
  const avatarSize = {
    lg: "size-10",
    md: "size-8",
    sm: "size-7",
  }[size]

  const textSize = {
    lg: "text-sm",
    md: "text-sm",
    sm: "text-xs",
  }[size]

  return (
    <View
      className={cn(
        "rounded-full bg-gray-600 items-center justify-center",
        avatarSize,
        className,
      )}
    >
      <Text className={cn("text-gray-200 font-sora uppercase", textSize)}>
        {initials}
      </Text>
    </View>
  )
}
