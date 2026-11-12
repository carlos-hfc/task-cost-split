import Lucide from "@react-native-vector-icons/lucide"
import {
  Keyboard,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"

import { colors } from "@/colors"

import { Button } from "./button"
import { Input } from "./input"

interface ActivityModalProps {
  visible: boolean
  onClose(): void
  title: string
}

export function ActivityModal({ visible, onClose, title }: ActivityModalProps) {
  function handleBackdropPress() {
    if (Keyboard.isVisible()) return Keyboard.dismiss()

    onClose()
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={handleBackdropPress}
    >
      <View className="flex-1 justify-center px-4">
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View className="bg-black/80 px-4 absolute inset-0" />
        </TouchableWithoutFeedback>

        <View className="bg-gray-700 rounded-lg p-6 w-full gap-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-100 font-inter-semibold text-base">
              {title}
            </Text>

            <TouchableOpacity onPress={handleBackdropPress}>
              <Lucide
                name="x"
                color={colors.gray[300]}
                size={16}
              />
            </TouchableOpacity>
          </View>

          <View className="gap-2">
            <Input placeholder="Título" />

            <Input
              placeholder="Data"
              icon="calendar"
            />
          </View>

          <Button>Salvar</Button>
        </View>
      </View>
    </Modal>
  )
}
