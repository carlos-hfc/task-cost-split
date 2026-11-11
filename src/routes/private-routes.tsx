import Lucide from "@react-native-vector-icons/lucide"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import clsx from "clsx"
import { Text, TouchableOpacity } from "react-native"

import { PrivateStackParamsList } from "@/@types/navigation"
import { colors } from "@/colors"
import { Layout } from "@/components/layout"
import { Summary } from "@/screens/summary"

const PrivateStack = createBottomTabNavigator<PrivateStackParamsList>()

export function PrivateRoutes() {
  return (
    <PrivateStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.gray[700],
          paddingHorizontal: 24,
          paddingVertical: 20,
          height: 97,
          gap: 16,
          borderTopWidth: 0,
        },
        tabBarButton({ style, ...props }) {
          return (
            <TouchableOpacity
              {...props}
              activeOpacity={0.5}
              className="p-0 justify-center items-center gap-3 flex-1"
            />
          )
        },
        tabBarLabel({ focused, ...props }) {
          return (
            <Text
              {...props}
              className={clsx(
                "text-sm font-inter-semibold",
                focused ? "text-white" : "text-gray-400",
              )}
            />
          )
        },
      }}
      screenLayout={Layout}
    >
      <PrivateStack.Screen
        name="activities"
        component={Summary}
        options={{
          title: "Atividades",
          tabBarIcon({ focused }) {
            return (
              <Lucide
                name="list"
                color={focused ? colors.green.base : colors.gray[400]}
                size={24}
              />
            )
          },
        }}
      />
      <PrivateStack.Screen
        name="summary"
        component={Summary}
        options={{
          title: "Resumo",
          tabBarIcon({ focused }) {
            return (
              <Lucide
                name="chart-pie"
                color={focused ? colors.green.base : colors.gray[400]}
                size={24}
              />
            )
          },
        }}
      />
      <PrivateStack.Screen
        name="participants"
        component={Summary}
        options={{
          title: "Participantes",
          tabBarIcon({ focused }) {
            return (
              <Lucide
                name="users"
                color={focused ? colors.green.base : colors.gray[400]}
                size={24}
              />
            )
          },
        }}
      />
    </PrivateStack.Navigator>
  )
}
