import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import { Animated, Dimensions, Text } from "react-native"

import { cn } from "@/utils/cn"

type SnackbarMessageType = "success" | "error"

interface NotifyMessage {
  message: string
  type: SnackbarMessageType
}

type SnackbarContextType = {
  message: string | null
  type: SnackbarMessageType | null
  notify(params: NotifyMessage): void
}

export const SnackbarContext = createContext<SnackbarContextType>({
  message: null,
  type: null,
  notify() {},
})

export const useSnackbarContext = () => useContext(SnackbarContext)

export function SnackbarProvider({ children }: PropsWithChildren) {
  const [message, setMessage] = useState<string | null>(null)
  const [type, setType] = useState<SnackbarMessageType | null>(null)

  const container = useMemo(() => new Animated.Value(200), [])

  const notify = useCallback(
    ({ message, type }: NotifyMessage) => {
      setMessage(message)
      setType(type)

      Animated.timing(container, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start()

      setTimeout(() => {
        Animated.timing(container, {
          toValue: 200,
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          // setMessage(null)
          // setType(null)
        })
      }, 5000)
    },
    [container],
  )

  const value = useMemo<SnackbarContextType>(() => {
    return {
      message,
      type,
      notify,
    }
  }, [message, notify, type])

  return (
    <SnackbarContext.Provider value={value}>
      {children}

      {message && type && (
        <Animated.View
          className={cn(
            "absolute bottom-28 p-3 rounded-lg self-center shadow-2xl z-10",
            type === "success" && "bg-green-900",
            type === "error" && "bg-red-900",
          )}
          style={{
            width: Dimensions.get("window").width - 48,
            transform: [{ translateY: container }],
          }}
        >
          <Text
            className={cn(
              "text-sm font-sora",
              type === "success" && "text-green-200",
              type === "error" && "text-red-200",
            )}
          >
            {message}
          </Text>
        </Animated.View>
      )}
    </SnackbarContext.Provider>
  )
}
