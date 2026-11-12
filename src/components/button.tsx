import Lucide, { LucideIconName } from "@react-native-vector-icons/lucide"
import clsx from "clsx"
import { createContext } from "react"
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"

import { colors } from "@/colors"

type ButtonVariant = "primary" | "secondary" | "danger"

type ButtonContextType = {
  variant: ButtonVariant
}

const ButtonContext = createContext<ButtonContextType>({ variant: "primary" })

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant
  icon?: LucideIconName
}

export function Button({
  variant = "primary",
  children,
  icon,
  className,
  ...props
}: ButtonProps) {
  const buttonVariants = clsx({
    "bg-green-base border border-green-light": variant === "primary",
    "bg-gray-600 border border-gray-500":
      variant === "secondary" || variant === "danger",
  })

  const textVariants = clsx({
    "text-gray-800": variant === "primary",
    "text-gray-200": variant === "secondary",
    "text-danger-light": variant === "danger",
  })

  const color = {
    primary: colors.gray[800],
    secondary: colors.gray[300],
    danger: colors.danger.light,
  }

  const HAS_CHILDREN = Boolean(children)

  return (
    <ButtonContext.Provider value={{ variant }}>
      <TouchableOpacity
        className={clsx(
          "h-12 flex-row gap-2 items-center justify-center rounded-full",
          buttonVariants,
          !HAS_CHILDREN ? "size-12 p-0" : "px-4 py-3",
          className,
        )}
        {...props}
      >
        {icon && (
          <Lucide
            name={icon}
            size={24}
            color={color[variant]}
          />
        )}

        {children && (
          <Text className={clsx("text-base font-inter-semibold", textVariants)}>
            {children}
          </Text>
        )}
      </TouchableOpacity>
    </ButtonContext.Provider>
  )
}
