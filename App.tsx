// @ts-expect-error CSS modules are handled by the bundler
import "@/global.css"

import { Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter"
import { Sora_700Bold } from "@expo-google-fonts/sora"
import { useFonts } from "expo-font"
import { SafeAreaView } from "react-native-safe-area-context"

import { NavigationRoutes } from "@/routes"

export default function App() {
  const [loaded] = useFonts({
    Sora_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
  })

  if (!loaded) return null

  return (
    <SafeAreaView className="flex-1 bg-gray-800">
      <NavigationRoutes />
    </SafeAreaView>
  )
}
