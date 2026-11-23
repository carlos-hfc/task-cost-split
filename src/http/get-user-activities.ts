import { Activity } from "@/@types/activity"
import { api } from "@/lib/axios"

export interface GetUserActivitiesRequest {
  userId: string
}

export interface GetUserActivitiesResponse {
  activities: Array<
    Activity & {
      expensesAmount: number
      participantsAmount: number
    }
  >
}

export async function getUserActivities({ userId }: GetUserActivitiesRequest) {
  const response = await api.get<GetUserActivitiesResponse>(
    `/users/${userId}/activities`,
  )

  return response.data
}
