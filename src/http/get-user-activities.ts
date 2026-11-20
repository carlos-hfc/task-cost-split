import { User } from "@/@types/user"
import { api } from "@/lib/axios"

export interface GetUserActivitiesRequest {
  userId: string
}

export interface GetUserActivitiesResponse {
  activities: {
    id: string
    name: string
    expensesAmount: number
    activityDate: Date
    totalAmountInCents: number
    participants: User[]
    participantsAmount: number
  }[]
}

export async function getUserActivities({ userId }: GetUserActivitiesRequest) {
  const response = await api.get<GetUserActivitiesResponse>(
    `/users/${userId}/activities`,
  )

  return response.data
}
