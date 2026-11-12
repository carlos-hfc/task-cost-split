import Lucide, { LucideIconName } from "@react-native-vector-icons/lucide"
import clsx from "clsx"
import { useRef, useState } from "react"
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  ViewInstance,
} from "react-native"

import { colors } from "@/colors"

import { Avatar } from "./avatar"

export interface SelectOption {
  label: string
  value: string
}

interface SelectProps {
  icon?: LucideIconName
  placeholder?: string
  options: SelectOption[]
  value: string[]
  onValueChange(value: string[]): void
  offset?: number
}

interface DropdownPosition {
  top?: number
  bottom?: number
  left: number
  width: number
}

const MAX_DROPDOWN_HEIGHT = 80 * 4 // max-h-80

export function Select({
  icon,
  options,
  value,
  placeholder,
  onValueChange,
  offset = 8,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<DropdownPosition>({
    left: 0,
    width: 0,
  })

  const containerRef = useRef<ViewInstance>(null)

  const selectedOptions = options.filter(option => value.includes(option.value))

  function handleOpen() {
    containerRef.current?.measureInWindow((x, y, width, height) => {
      const screenHeight = Dimensions.get("window").height
      const spaceBelow = screenHeight - (y + height)

      const opensUpwards =
        spaceBelow < MAX_DROPDOWN_HEIGHT + offset && y > spaceBelow

      if (opensUpwards) {
        setPosition({
          bottom: screenHeight - y + offset,
          left: x,
          width,
        })
      } else {
        setPosition({
          top: y + height + offset,
          left: x,
          width,
        })
      }
      setIsOpen(true)
    })
  }

  function toggleSelect(optionValue: string) {
    const isAlreadySelected = value.includes(optionValue)

    if (isAlreadySelected) {
      onValueChange(value.filter(item => item !== optionValue))
    } else {
      onValueChange([...value, optionValue])
    }
  }

  return (
    <View
      ref={containerRef}
      collapsable={false}
    >
      <Pressable
        onPress={handleOpen}
        className={clsx(
          "h-12 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 items-center gap-3 flex-row",
          isOpen && "border-white",
        )}
      >
        {icon && (
          <Lucide
            name={icon}
            size={20}
            color={colors.gray[300]}
          />
        )}

        <Text
          numberOfLines={1}
          className={clsx(
            "text-base font-inter flex-1",
            selectedOptions.length > 0 ? "text-gray-200" : "text-gray-400",
          )}
        >
          {placeholder}
        </Text>
      </Pressable>

      <Modal
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
        backdropColor="#0009"
        animationType="fade"
      >
        <Pressable
          onPress={() => setIsOpen(false)}
          className="flex-1"
        />

        <View
          className="overflow-hidden rounded-lg border border-gray-600 bg-gray-700 w-full z-10 p-4 absolute"
          style={{
            ...position,
            maxHeight: MAX_DROPDOWN_HEIGHT,
          }}
        >
          <ScrollView
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
            contentContainerClassName="gap-3"
            showsVerticalScrollIndicator={false}
          >
            {options.map(option => (
              <Pressable
                key={option.value}
                className="gap-3 flex-row items-center"
                onPress={() => toggleSelect(option.value)}
              >
                <Avatar initials="CF" />

                <Text className="flex-1 text-gray-200 text-base font-inter-semibold">
                  {option.label}
                </Text>

                {value.includes(option.value) && (
                  <Lucide
                    name="check-circle-2"
                    color={colors.green.base}
                    size={18}
                  />
                )}
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}
