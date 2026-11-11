import { View } from "react-native"

import { Header } from "@/components/header"

import { EmptyParticipants } from "./empty-participants"
import { ParticipantCard } from "./participant-card"

export function Participants() {
  return (
    <>
      <Header
        title="Participantes"
        subtitle="Pessoas com quem você já dividiu tarefas"
      />

      <EmptyParticipants />

      <View className="gap-4 hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <ParticipantCard
            key={i}
            name="John Doe"
            activityAmount={i + 1}
          />
        ))}
      </View>
    </>
  )
}
