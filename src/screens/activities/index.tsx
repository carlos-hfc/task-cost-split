import { useFocusEffect } from "@react-navigation/native"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import { FlatList, RefreshControl } from "react-native"

import { ActivityStackScreenProps } from "@/@types/navigation"
import { colors } from "@/colors"
import { ActivityModal } from "@/components/activity-modal"
import { Button } from "@/components/button"
import { Header } from "@/components/header"
import { Loading } from "@/components/loading"
import { useAuthContext } from "@/contexts/auth-context"
import { getUserActivities } from "@/http/get-user-activities"

import { ActivityCard } from "./activity-card"
import { EmptyActivities } from "./empty-activities"

export function Activities({
  route,
  navigation,
}: ActivityStackScreenProps<"list">) {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const { user, loading } = useAuthContext()

  const { data, isError, isLoading, refetch } = useQuery({
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

  async function handleRefresh() {
    await refetch()
  }

  const IS_EMPTY = data?.activities && data?.activities.length === 0 && !isError

  return (
    <>
      <Header
        title="Atividades"
        subtitle="Organize suas despesas divididas"
      />

      {isLoading && <Loading />}
      {IS_EMPTY && <EmptyActivities />}

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.activities}
        renderItem={({ item }) => <ActivityCard {...item} />}
        contentContainerClassName="gap-2"
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            colors={[colors.green.base]}
          />
        }
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
