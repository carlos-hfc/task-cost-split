import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react"

import { User } from "@/@types/user"

type AuthContentType = {
  user: User | null
  token: string | null
}

export const AuthContext = createContext<AuthContentType>({
  token: null,
  user: null,
})

export const useAuthContext = () => useContext(AuthContext)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState<string | null>(null)

  const value: AuthContentType = useMemo(() => {
    return {
      token,
      user,
    }
  }, [token, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
