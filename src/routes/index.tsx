import { DarkTheme, NavigationContainer } from "@react-navigation/native"
import { useCallback } from "react"

import { colors } from "@/colors"

import { PrivateRoutes } from "./private-routes"

const AppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.gray[800],
  },
}

export function NavigationRoutes() {
  const Routes = useCallback(() => {
    return <PrivateRoutes />
  }, [])

  return (
    <NavigationContainer theme={AppTheme}>
      <Routes />
    </NavigationContainer>
  )
}
