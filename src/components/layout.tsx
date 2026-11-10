import { PropsWithChildren } from "react"
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export function Layout({ children }: PropsWithChildren) {
  return (
    <SafeAreaView className="flex-1 bg-gray-800">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView className="flex-1">
          <ScrollView>{children}</ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
