import Lucide from "@react-native-vector-icons/lucide"
import clsx from "clsx"
import { PropsWithChildren, useCallback, useEffect, useRef } from "react"
import {
  Animated,
  Dimensions,
  Keyboard,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { colors } from "@/colors"

const { height } = Dimensions.get("screen")

interface BottomSheetProps extends PropsWithChildren {
  open: boolean
  onClose(): void
  title?: string
}

export function BottomSheet({
  children,
  onClose,
  open,
  title,
}: BottomSheetProps) {
  const overlay = useRef(new Animated.Value(height)).current
  const container = useRef(new Animated.Value(height)).current

  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  const onOpen = useCallback(() => {
    Animated.parallel([
      Animated.timing(overlay, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(container, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }, [container, overlay])

  const handleClose = useCallback(
    (callback?: VoidFunction) => {
      Animated.parallel([
        Animated.timing(overlay, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(container, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => callback && callback())
    },
    [container, overlay],
  )

  const handleBackdropPress = useCallback(() => {
    if (Keyboard.isVisible()) return Keyboard.dismiss()

    handleClose(() => onCloseRef.current?.())
  }, [handleClose])

  useEffect(() => {
    if (open) onOpen()
    else handleClose()
  }, [handleClose, onOpen, open])

  return (
    <Modal
      transparent
      animationType="slide"
      visible={open}
      onRequestClose={handleBackdropPress}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <Animated.View
          className={clsx("flex-1 bg-black/60", `opacity-${overlay}`)}
        />
      </TouchableWithoutFeedback>

      <Animated.View
        className={clsx(
          "bg-gray-700 w-full rounded-t-3xl",
          `translate-y-${container}`,
        )}
      >
        <SafeAreaView className="px-6 py-8 gap-8">
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-100 text-base font-inter-semibold">
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

          {children}
        </SafeAreaView>
      </Animated.View>
    </Modal>
  )
}
