import { NavigationContainer } from "@react-navigation/native"
import { useCallback } from "react"

import { PublicRoutes } from "./public-routes"

export function NavigationRoutes() {
  const Routes = useCallback(() => {
    return <PublicRoutes />
  }, [])

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  )
}
