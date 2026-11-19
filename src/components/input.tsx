import Lucide, { LucideIconName } from "@react-native-vector-icons/lucide"
import { useRef, useState } from "react"
import {
  Text,
  TextInput,
  TextInputInstance,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native"
import CurrencyInput, { CurrencyInputProps } from "react-native-currency-input"

import { colors } from "@/colors"
import { cn } from "@/utils/cn"

interface BaseProps {
  icon?: LucideIconName
  error?: string
}

type DefaultInputProps = BaseProps &
  TextInputProps & {
    currency?: false
  }

type MoneyInputProps = BaseProps &
  CurrencyInputProps & {
    currency: true
  }

type InputProps = DefaultInputProps | MoneyInputProps

const inputClassName = "h-12 text-base text-gray-200 font-inter flex-1"

export function Input({
  icon,
  currency = false,
  error,
  secureTextEntry,
  ...props
}: InputProps) {
  const inputRef = useRef<TextInputInstance>(null)

  const [isFocused, setIsFocused] = useState(false)
  const [showText, setShowText] = useState(secureTextEntry)

  const onFocus = () =>
    inputRef.current && setIsFocused(inputRef.current.isFocused())

  return (
    <View className="gap-1">
      <View
        className={cn(
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

        {currency ? (
          <CurrencyInput
            {...(props as CurrencyInputProps)}
            className={inputClassName}
            placeholderTextColor={colors.gray[400]}
            onFocus={() => setIsFocused(true)}
            onEndEditing={() => setIsFocused(false)}
            precision={2}
            delimiter="."
            separator=","
            prefix="R$ "
          />
        ) : (
          <TextInput
            {...(props as TextInputProps)}
            ref={inputRef}
            className={inputClassName}
            placeholderTextColor={colors.gray[400]}
            onFocus={onFocus}
            onEndEditing={onFocus}
            secureTextEntry={showText}
          />
        )}

        {secureTextEntry && (
          <TouchableOpacity
            className="flex items-center justify-center h-full w-6"
            onPress={() => setShowText(prev => !prev)}
          >
            <Lucide
              name={showText ? "eye" : "eye-off"}
              color={colors.gray[400]}
              size={16}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <View className="flex-row items-center gap-1.5">
          <Lucide
            name="circle-alert"
            color={colors.danger.light}
            size={14}
          />

          <Text className="text-danger-light text-sm font-inter">{error}</Text>
        </View>
      )}
    </View>
  )
}
