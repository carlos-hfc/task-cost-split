import Lucide, { LucideIconName } from "@react-native-vector-icons/lucide"
import clsx from "clsx"
import { useRef, useState } from "react"
import {
  TextInput,
  TextInputInstance,
  TextInputProps,
  View,
} from "react-native"

import { colors } from "@/colors"

interface InputProps extends TextInputProps {
  icon?: LucideIconName
}

export function Input({ icon, ...props }: InputProps) {
  const inputRef = useRef<TextInputInstance>(null)

  const [isFocused, setIsFocused] = useState(false)

  const onFocus = () =>
    inputRef.current && setIsFocused(inputRef.current.isFocused())

  return (
    <View
      className={clsx(
        "h-12 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 items-center gap-3 flex-row",
        isFocused && "border-white",
      )}
    >
      {icon && (
        <Lucide
          name={icon}
          size={20}
          color={colors.gray[300]}
        />
      )}

      <TextInput
        {...props}
        ref={inputRef}
        className="h-12 text-base text-gray-200 font-inter flex-1"
        placeholderTextColor={colors.gray[400]}
        onFocus={onFocus}
        onEndEditing={onFocus}
      />
    </View>
  )
}
