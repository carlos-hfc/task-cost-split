import { useQuery } from "@tanstack/react-query"
import { FlatList } from "react-native"

import { Header } from "@/components/header"
import { Loading } from "@/components/loading"
import { useAuthContext } from "@/contexts/auth-context"
import { getAllUsers } from "@/http/get-all-users"

import { EmptyParticipants } from "./empty-participants"
import { ParticipantCard } from "./participant-card"

export function Participants() {
  const { user } = useAuthContext()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["participants"],
    queryFn: getAllUsers,
    select: data => ({
      users: data.users.filter(item => item.id !== user?.id),
    }),
  })

  const IS_EMPTY = data?.users && data?.users.length === 0 && !isError

  return (
    <>
      <Header
        title="Participantes"
        subtitle="Pessoas com quem você já dividiu tarefas"
      />

      {isLoading && <Loading />}
      {IS_EMPTY && <EmptyParticipants />}

      {!IS_EMPTY && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data?.users}
          renderItem={({ item }) => (
            <ParticipantCard
              name={item.name}
              activityAmount={0}
            />
          )}
          contentContainerClassName="gap-4"
        />
      )}
    </>
  )
}
