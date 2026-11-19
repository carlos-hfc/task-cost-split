// @ts-expect-error CSS modules are handled by the bundler
import "@/global.css"

import { Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter"
import { Sora_700Bold } from "@expo-google-fonts/sora"
import { QueryClientProvider } from "@tanstack/react-query"
import { useFonts } from "expo-font"
import { StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { AuthProvider } from "@/contexts/auth-context"
import { SnackbarProvider } from "@/contexts/snackbar-context"
import { queryClient } from "@/lib/react-query"
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
      <StatusBar barStyle="light-content" />

      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <AuthProvider>
            <NavigationRoutes />
          </AuthProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </SafeAreaView>
  )
}
