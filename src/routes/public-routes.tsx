import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { PublicStackParamsList } from "@/@types/navigation"
import { Layout } from "@/components/layout"
import { Login } from "@/screens/login"

const PublicStack = createNativeStackNavigator<PublicStackParamsList>()

export function PublicRoutes() {
  return (
    <PublicStack.Navigator
      screenOptions={{ headerShown: false }}
      screenLayout={({ children }) => <Layout>{children}</Layout>}
    >
      <PublicStack.Screen
        name="login"
        component={Login}
      />
    </PublicStack.Navigator>
  )
}
