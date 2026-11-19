import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

import { User } from "@/@types/user"
import { Loading } from "@/components/loading"

type AuthContentType = {
  user: User | null
  token: string | null
  saveData(params: SaveDataParams): void
  handleLogout(): void
  loading: boolean
  toggleLoading(value: boolean): void
}

export const AuthContext = createContext<AuthContentType>({
  token: null,
  user: null,
  saveData() {},
  handleLogout() {},
  loading: false,
  toggleLoading() {},
})

export const useAuthContext = () => useContext(AuthContext)

type SaveDataParams = {
  user: User
  token: string
}

const STORAGE_USER = "@task-cost-split:user"

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const toggleLoading = (value: boolean) => setLoading(value)

  async function restoreUserSession() {
    const storageData = await AsyncStorage.getItem(STORAGE_USER)

    if (storageData) {
      const { token, user } = JSON.parse(storageData) as SaveDataParams

      setUser(user)
      setToken(token)
    }

    return storageData
  }

  const saveData = useCallback(async (data: SaveDataParams) => {
    toggleLoading(true)
    await AsyncStorage.setItem(STORAGE_USER, JSON.stringify(data))

    setUser(data.user)
    setToken(data.token)
    toggleLoading(false)
  }, [])

  const handleLogout = useCallback(async () => {
    toggleLoading(true)
    await AsyncStorage.removeItem(STORAGE_USER)

    setUser(null)
    setToken(null)
    toggleLoading(false)
  }, [])

  useEffect(() => {
    async function checkUser() {
      try {
        toggleLoading(true)
        const storageData = await restoreUserSession()

        if (!storageData) await handleLogout()
      } catch (error) {
        await handleLogout()
      } finally {
        toggleLoading(false)
      }
    }

    checkUser()
  }, [handleLogout])

  const value: AuthContentType = useMemo(() => {
    return {
      token,
      user,
      saveData,
      handleLogout,
      loading,
      toggleLoading,
    }
  }, [handleLogout, loading, saveData, token, user])

  return (
    <AuthContext.Provider value={value}>
      {children}

      {loading && <Loading />}
    </AuthContext.Provider>
  )
}
