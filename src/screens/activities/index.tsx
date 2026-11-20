import { useFocusEffect } from "@react-navigation/native"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import { FlatList } from "react-native"

import { ActivityStackScreenProps } from "@/@types/navigation"
import { ActivityModal } from "@/components/activity-modal"
import { Button } from "@/components/button"
import { Header } from "@/components/header"
import { useAuthContext } from "@/contexts/auth-context"
import { getUserActivities } from "@/http/get-user-activities"

import { ActivityCard } from "./activity-card"
import { EmptyActivities } from "./empty-activities"

const ACTIVITY = {
  title: "Férias de verão",
  value: 4500,
  date: "20/12/25",
  participants: 2,
  expenses: 3,
}

export function Activities({
  route,
  navigation,
}: ActivityStackScreenProps<"list">) {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const { user } = useAuthContext()

  const { data, isError, isLoading } = useQuery({
    queryKey: ["user-activities", user?.id],
    queryFn: () => getUserActivities({ userId: String(user?.id) }),
  })

  useFocusEffect(
    useCallback(() => {
      if (route.params?.openModal) {
        setIsOpenModal(true)
      }

      navigation.setParams({ openModal: undefined })
    }, [navigation, route.params?.openModal]),
  )

  const IS_EMPTY = data?.activities && data?.activities.length === 0 && !isError

  return (
    <>
      <Header
        title="Atividades"
        subtitle="Organize suas despesas divididas"
      />

      {IS_EMPTY && <EmptyActivities />}

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.activities}
        renderItem={({ item }) => <ActivityCard {...item} />}
        contentContainerClassName="gap-2"
      />

      <Button
        activeOpacity={0.8}
        icon="plus"
        className="absolute bottom-6 right-6"
        onPress={() => setIsOpenModal(true)}
      >
        Criar
      </Button>

      <ActivityModal
        visible={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        title="Nova atividade"
      />
    </>
  )
}
