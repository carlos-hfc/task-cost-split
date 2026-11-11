import { LucideIconName } from "@react-native-vector-icons/lucide"
import { ScrollView, Text, View } from "react-native"

import { Header } from "@/components/header"

import { EmptySummary } from "./empty-summary"
import { SummaryCard, SummaryCardType } from "./summary-card"
import { SummaryResume } from "./summary-resume"

const SUMMARIES = [
  {
    amount: 360,
    qty: 2,
    type: "paid" as SummaryCardType,
    text: "Pago em",
  },
  {
    amount: 1230,
    qty: 6,
    type: "pending" as SummaryCardType,
    text: "Pendente em",
  },
  {
    amount: 6800,
    type: "total" as SummaryCardType,
    text: "Total de despesas",
  },
]

const RESUMES = [
  {
    icon: "list" as LucideIconName,
    amount: 5,
    text: "Atividades",
  },
  {
    icon: "circle-dollar-sign" as LucideIconName,
    amount: 13,
    text: "Despesas",
  },
  {
    icon: "users" as LucideIconName,
    amount: 6,
    text: "Participantes",
  },
]

export function Summary() {
  return (
    <ScrollView contentContainerClassName="gap-4 p-6 pt-10 flex-1">
      <Header
        title="Resumo"
        subtitle="Acompanhe as informações principais sobre suas atividades"
      />

      <EmptySummary />

      <View className="gap-4 hidden">
        <View className="gap-3">
          <Text className="text-gray-100 font-inter text-sm">
            Minhas contas
          </Text>

          {SUMMARIES.slice(0, 2).map(summary => (
            <SummaryCard
              key={`summary-${summary.type}`}
              {...summary}
            />
          ))}
        </View>

        <View className="gap-3">
          <Text className="text-gray-100 font-inter text-sm">
            Informações gerais
          </Text>

          {SUMMARIES.slice(2).map(summary => (
            <SummaryCard
              key={`summary-${summary.type}`}
              {...summary}
            />
          ))}

          <View className="flex-row gap-2 items-center">
            {RESUMES.map(resume => (
              <SummaryResume
                key={`resume-${resume.icon}`}
                {...resume}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
