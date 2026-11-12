import Lucide from "@react-native-vector-icons/lucide"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { colors } from "@/colors"
import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Select } from "@/components/select"

const OPTIONS = [
  { label: "Bia", value: "Bia" },
  { label: "Ana", value: "Ana" },
  { label: "Carlos", value: "Carlos" },
]

export function NewExpenseSheet() {
  const [value, setValue] = useState<any[]>([])

  return (
    <>
      <View className="gap-2">
        <Input placeholder="Título" />
        <Input
          currency
          value={0}
        />
        <Select
          icon="users"
          placeholder={
            value.length > 0 ? value.length.toString() : "Participantes"
          }
          options={OPTIONS}
          value={value}
          onValueChange={setValue}
        />

        <View className="gap-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <View
              key={i}
              className="flex-row items-center gap-3"
            >
              <Avatar
                initials="JD"
                size="md"
              />
              <Text className="flex-1 text-gray-200 text-base font-inter-semibold">
                John Doe
              </Text>
              <TouchableOpacity>
                <Lucide
                  name="trash"
                  size={16}
                  color={colors.danger.light}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <Button>Salvar</Button>
    </>
  )
}
