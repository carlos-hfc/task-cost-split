import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { PrivateStackParamsList } from "@/@types/navigation"
import { Layout } from "@/components/layout"
import { Summary } from "@/screens/summary"

const PrivateStack = createNativeStackNavigator<PrivateStackParamsList>()

export function PrivateRoutes() {
  return (
    <PrivateStack.Navigator
      screenOptions={{ headerShown: false }}
      screenLayout={props => (
        <Layout
          isPrivate
          {...props}
        />
      )}
    >
      <PrivateStack.Screen
        name="summary"
        component={Summary}
      />
    </PrivateStack.Navigator>
  )
}
