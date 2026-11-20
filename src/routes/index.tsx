import { DarkTheme, NavigationContainer } from "@react-navigation/native"
import { useCallback } from "react"

import { colors } from "@/colors"
import { useAuthContext } from "@/contexts/auth-context"

import { PrivateRoutes } from "./private-routes"
import { PublicRoutes } from "./public-routes"

const AppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.gray[800],
  },
}

export function NavigationRoutes() {
  const { token, user } = useAuthContext()

  const Routes = useCallback(() => {
    if (!user || !token) return <PublicRoutes />

    return <PrivateRoutes />
  }, [token, user])

  return (
    <NavigationContainer theme={AppTheme}>
      <Routes />
    </NavigationContainer>
  )
}
