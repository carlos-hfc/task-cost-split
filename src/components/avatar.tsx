import clsx from "clsx"
import { Text, View } from "react-native"

type AvatarSize = "sm" | "md"

interface AvatarProps {
  initials: string
  size?: AvatarSize
  className?: string
}

export function Avatar({ initials, size = "md", className }: AvatarProps) {
  const avatarSize = clsx({
    "size-10": size === "md",
    "size-7": size === "sm",
  })

  const textSize = clsx({
    "text-sm": size === "md",
    "text-xs": size === "sm",
  })

  return (
    <View
      className={clsx(
        "rounded-full bg-gray-600 items-center justify-center",
        avatarSize,
        className,
      )}
    >
      <Text className={clsx("text-gray-200 font-sora", textSize)}>
        {initials}
      </Text>
    </View>
  )
}
