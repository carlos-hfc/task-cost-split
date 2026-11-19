import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useState } from "react"
import { FlatList } from "react-native"

import { ActivityStackScreenProps } from "@/@types/navigation"
import { ActivityModal } from "@/components/activity-modal"
import { Button } from "@/components/button"
import { Header } from "@/components/header"

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

  useFocusEffect(
    useCallback(() => {
      if (route.params?.openModal) {
        setIsOpenModal(true)
      }

      navigation.setParams({ openModal: undefined })
    }, [navigation, route.params?.openModal]),
  )

  return (
    <>
      <Header
        title="Atividades"
        subtitle="Organize suas despesas divididas"
      />

      <EmptyActivities />

      <FlatList
        data={Array.from({ length: 15 }).fill(ACTIVITY)}
        renderItem={({ item }) => <ActivityCard {...(item as any)} />}
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
