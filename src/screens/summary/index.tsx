import { useQuery } from "@tanstack/react-query"
import { Text, View } from "react-native"

import { Header } from "@/components/header"
import { Loading } from "@/components/loading"
import { getUserResume } from "@/http/get-user-resume"

import { EmptySummary } from "./empty-summary"
import { SummaryCard } from "./summary-card"
import { SummaryResume } from "./summary-resume"

export function Summary() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-resume"],
    queryFn: getUserResume,
  })

  const IS_EMPTY = data && data.activitiesCount === 0 && !isError

  return (
    <>
      <Header
        title="Resumo"
        subtitle="Acompanhe as informações principais sobre suas atividades"
      />

      {isLoading && <Loading />}
      {IS_EMPTY && <EmptySummary />}

      {!IS_EMPTY && data && (
        <View className="gap-4">
          <View className="gap-3">
            <Text className="text-gray-100 font-inter text-sm">
              Minhas contas
            </Text>

            <SummaryCard
              type="paid"
              amount={data.amountPaidInCents / 100}
              text="Pago em"
              qty={data.paidExpensesCount}
            />

            <SummaryCard
              type="pending"
              amount={data.amountToPayInCents / 100}
              text="Pendente em"
              qty={data.expensesToPayCount}
            />
          </View>

          <View className="gap-3">
            <Text className="text-gray-100 font-inter text-sm">
              Informações gerais
            </Text>

            <SummaryCard
              type="total"
              amount={data.totalExpensesAmountInCents / 100}
              text="Total de despesas"
            />

            <View className="flex-row gap-2 items-center">
              <SummaryResume
                text="Atividades"
                icon="list"
                amount={data.activitiesCount}
              />

              <SummaryResume
                text="Despesas"
                icon="circle-dollar-sign"
                amount={data.expensesCount}
              />

              <SummaryResume
                text="Participantes"
                icon="users"
                amount={data.uniqueParticipantsCount}
              />
            </View>
          </View>
        </View>
      )}
    </>
  )
}
