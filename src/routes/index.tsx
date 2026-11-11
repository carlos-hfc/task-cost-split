import { NavigationContainer } from "@react-navigation/native"
import { useCallback } from "react"

import { PrivateRoutes } from "./private-routes"

export function NavigationRoutes() {
  const Routes = useCallback(() => {
    return <PrivateRoutes />
  }, [])

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  )
}
