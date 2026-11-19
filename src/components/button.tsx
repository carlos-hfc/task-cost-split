import Lucide, { LucideIconName } from "@react-native-vector-icons/lucide"
import { createContext } from "react"
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"

import { colors } from "@/colors"
import { cn } from "@/utils/cn"

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
  const buttonVariants = {
    primary: "bg-green-base border border-green-light",
    secondary: "bg-gray-600 border border-gray-500",
    danger: "bg-gray-600 border border-gray-500",
  }[variant]

  const textVariants = {
    primary: "text-gray-800",
    secondary: "text-gray-200",
    danger: "text-danger-light",
  }[variant]

  const color = {
    primary: colors.gray[800],
    secondary: colors.gray[300],
    danger: colors.danger.light,
  }

  const HAS_CHILDREN = Boolean(children)

  return (
    <ButtonContext.Provider value={{ variant }}>
      <TouchableOpacity
        className={cn(
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
          <Text className={cn("text-base font-inter-semibold", textVariants)}>
            {children}
          </Text>
        )}
      </TouchableOpacity>
    </ButtonContext.Provider>
  )
}
