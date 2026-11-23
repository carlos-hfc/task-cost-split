import DateTimePicker, {
  DateTimePickerChangeEvent,
} from "@react-native-community/datetimepicker"
import Lucide from "@react-native-vector-icons/lucide"
import { useState } from "react"
import { Platform, Text, TouchableOpacity, View } from "react-native"

import { colors } from "@/colors"
import { cn } from "@/utils/cn"

interface DatePickerProps {
  value?: Date | string | null
  onValueChange(date: Date): void
  placeholder?: string
  error?: string
  minDate?: Date
}

export function DatePicker({
  placeholder,
  error,
  value,
  onValueChange,
  minDate,
}: DatePickerProps) {
  const [showDatePicker, setShowDatePicker] = useState(false)

  function handleValueChange(
    event: DateTimePickerChangeEvent,
    selectedDate?: Date,
  ) {
    if (Platform.OS === "android") setShowDatePicker(false)

    const finalDate = selectedDate || new Date(event.nativeEvent.timestamp)

    onValueChange(finalDate)
  }

  const parsedDate = value ? new Date(value) : undefined

  return (
    <View className="gap-1">
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        activeOpacity={0.8}
        className="h-12 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 items-center gap-3 flex-row"
      >
        <Lucide
          name="calendar"
          size={20}
          color={colors.gray[300]}
        />
        <Text
          className={cn(
            "text-base text-gray-400 font-inter flex-1",
            value && "text-gray-200",
          )}
        >
          {parsedDate ? parsedDate.toLocaleDateString("pt-br") : placeholder}
        </Text>
      </TouchableOpacity>

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

      {showDatePicker && (
        <DateTimePicker
          value={parsedDate ?? new Date()}
          onValueChange={handleValueChange}
          onDismiss={() => setShowDatePicker(false)}
          minimumDate={minDate}
          timeZoneName="America/Sao_Paulo"
        />
      )}
    </View>
  )
}
