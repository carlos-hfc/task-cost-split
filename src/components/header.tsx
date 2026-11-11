import { Image, Text, View } from "react-native"

interface HeaderProps {
  title: string
  subtitle: string
}

export function Header({ subtitle, title }: HeaderProps) {
  return (
    <View className="gap-4">
      <View className="flex-row items-center gap-2">
        <Image
          source={require("@/assets/logo.png")}
          alt="Logo do TaskCost Split"
          className="size-4"
        />
        <Text className="font-sora text-green-base text-lg">
          TaskCost <Text className="text-green-light">Split</Text>
        </Text>
      </View>

      <View className="gap-1">
        <Text className="text-gray-100 text-xl font-inter-semibold">
          {title}
        </Text>

        <Text className="text-gray-300 text-base font-inter">{subtitle}</Text>
      </View>
    </View>
  )
}
