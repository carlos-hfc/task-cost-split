import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { PublicStackParamsList } from "@/@types/navigation"
import { Layout } from "@/components/layout"
import { Login } from "@/screens/login"
import { Register } from "@/screens/register"

const PublicStack = createNativeStackNavigator<PublicStackParamsList>()

export function PublicRoutes() {
  return (
    <PublicStack.Navigator
      screenOptions={{ headerShown: false }}
      screenLayout={Layout}
    >
      <PublicStack.Screen
        name="login"
        component={Login}
      />
      <PublicStack.Screen
        name="register"
        component={Register}
      />
    </PublicStack.Navigator>
  )
}
