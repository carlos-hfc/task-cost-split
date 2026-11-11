import Lucide, { LucideIconName } from "@react-native-vector-icons/lucide"
import { NativeStackNavigatorProps } from "@react-navigation/native-stack"
import clsx from "clsx"
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { PrivateStackParamsList } from "@/@types/navigation"
import { colors } from "@/colors"

interface PrivateRoutesObject {
  label: string
  icon: LucideIconName
}

const PRIVATE_ROUTES: Record<
  keyof PrivateStackParamsList,
  PrivateRoutesObject
> = {
  activities: { label: "Atividades", icon: "list" },
  summary: { label: "Resumo", icon: "chart-pie" },
  participants: { label: "Participantes", icon: "users" },
} as const

type LayoutProps = Parameters<
  NonNullable<NativeStackNavigatorProps["screenLayout"]>
>["0"] & {
  isPrivate?: boolean
}

export function Layout({
  children,
  isPrivate,
  route,
  navigation,
}: LayoutProps) {
  return (
    <SafeAreaView className="flex-1 bg-gray-800">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={"padding"}
        >
          {children}

          {isPrivate && (
            <View className="bg-gray-700 absolute bottom-0 w-full px-6 py-5 flex-row gap-4">
              {Object.entries(PRIVATE_ROUTES).map(([key, value]) => (
                <TouchableOpacity
                  key={`private-route-${key}`}
                  activeOpacity={0.5}
                  disabled={key === route.name}
                  onPress={() => navigation.replace(key)}
                  className="items-center justify-center gap-3 flex-1"
                >
                  <Lucide
                    name={value.icon}
                    color={
                      key === route.name ? colors.green.base : colors.gray[400]
                    }
                    size={24}
                  />

                  <Text
                    className={clsx(
                      "text-sm font-inter-semibold",
                      key === route.name ? "text-white" : "text-gray-400",
                    )}
                  >
                    {value.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
