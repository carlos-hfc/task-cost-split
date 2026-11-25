import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { FlatList, Text, View } from "react-native"

import { ActivityStackScreenProps } from "@/@types/navigation"
import { Avatar } from "@/components/avatar"
import { BottomSheet } from "@/components/bottom-sheet"
import { Button } from "@/components/button"
import { Loading } from "@/components/loading"
import { getActivity } from "@/http/get-activity"
import { cn } from "@/utils/cn"
import { currencyFormatter } from "@/utils/currency-formatter"

import { DetailsHeader } from "./details-header"
import { EmptyExpenses } from "./empty-expenses"
import { ExpenseCard } from "./expense-card"
import { NewExpenseSheet } from "./new-expense-sheet"

export function ActivityDetails({
  route,
}: ActivityStackScreenProps<"details">) {
  const activityId = route.params.id

  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false)

  const { data, isLoading, isError } = useQuery({
    queryKey: ["activities", activityId],
    queryFn: () => getActivity({ activityId }),
  })

  const IS_EMPTY = data && data.expenses.length === 0 && !isError

  if (isLoading) return <Loading />

  if (!data) return null

  return (
    <>
      <View className="gap-6 flex-1">
        <DetailsHeader
          id={data.id}
          name={data.name}
          activityDate={data.activityDate}
        />

        {IS_EMPTY ? (
          <EmptyExpenses />
        ) : (
          <>
            <View className="flex-row items-end justify-between">
              <View className="gap-1">
                <View className="flex-row">
                  {data.participants.slice(0, 6).map((participant, i) => (
                    <Avatar
                      key={participant.id}
                      name={participant.name}
                      size="sm"
                      className={cn(
                        "border border-gray-800",
                        i !== 0 && "-ml-2",
                      )}
                    />
                  ))}
                </View>

                <Text className="text-gray-400 text-sm font-inter">
                  {data.participants.length} participante(s)
                </Text>
              </View>

              <View className="gap-1">
                <Text className="text-green-light text-base font-inter-semibold text-right">
                  {currencyFormatter.format(data.totalAmountInCents / 100)}
                </Text>
                <Text className="text-gray-400 text-sm font-inter text-right">
                  Gastos totais
                </Text>
              </View>
            </View>

            <View className="gap-3 flex-1">
              <View className="flex-row items-center justify-between gap-2">
                <Text className="text-gray-200 text-base font-inter-semibold">
                  Despesas
                </Text>
                <Text className="text-gray-400 text-sm font-inter">
                  {data.expenses.length}
                </Text>
              </View>

              <FlatList
                data={data.expenses}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ExpenseCard {...item} />}
                contentContainerClassName="gap-2"
              />
            </View>
          </>
        )}
      </View>

      {!IS_EMPTY && (
        <Button
          activeOpacity={0.8}
          icon="plus"
          className="absolute bottom-6 right-6"
          onPress={() => setIsOpenBottomSheet(true)}
        >
          Nova
        </Button>
      )}

      <BottomSheet
        onClose={() => setIsOpenBottomSheet(false)}
        open={isOpenBottomSheet}
        titleComponent={
          <Text className="text-gray-100 text-base font-inter-semibold">
            Nova despesa
          </Text>
        }
      >
        <NewExpenseSheet onClose={() => setIsOpenBottomSheet(false)} />
      </BottomSheet>
    </>
  )
}
