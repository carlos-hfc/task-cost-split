import Lucide, { LucideIconName } from "@react-native-vector-icons/lucide"
import clsx from "clsx"
import { useMemo } from "react"
import { Text, View } from "react-native"

import { colors } from "@/colors"
import { currencyFormatter } from "@/utils/currency-formatter"

export type SummaryCardType = "total" | "paid" | "pending"

interface SummaryCardProps {
  type: SummaryCardType
  amount: number
  qty?: number
  text: string
}

export function SummaryCard({ amount, type, qty, text }: SummaryCardProps) {
  const iconContainerVariants = clsx({
    "bg-success-low": type === "paid",
    "bg-danger-low": type === "pending",
    "bg-gray-700": type === "total",
  })

  const icon = useMemo(() => {
    return {
      paid: {
        name: "check" as LucideIconName,
        color: colors.success.light,
      },
      pending: {
        name: "octagon-alert" as LucideIconName,
        color: colors.danger.light,
      },
      total: {
        name: "chart-pie" as LucideIconName,
        color: colors.green.light,
      },
    }[type]
  }, [type])

  return (
    <View className="border border-gray-600 rounded-lg p-4 gap-4 flex-row items-center">
      <View
        className={clsx(
          "rounded-lg size-12 items-center justify-center",
          iconContainerVariants,
        )}
      >
        <Lucide
          name={icon.name}
          color={icon.color}
          size={16}
        />
      </View>

      <View className="gap-1">
        <Text className="text-sm font-sora text-gray-200">
          R${" "}
          <Text className="text-xl">
            {currencyFormatter.format(amount).split("R$")[1]}
          </Text>
        </Text>
        <Text className="font-inter text-gray-300 text-sm">
          {text}{" "}
          {qty && <Text className="font-inter-semibold">{qty} despesa(s)</Text>}
        </Text>
      </View>
    </View>
  )
}
