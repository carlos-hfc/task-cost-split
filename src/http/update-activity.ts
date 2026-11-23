import { api } from "@/lib/axios"

export interface UpdateActivityRequest {
  activityId: string
  title: string
  activityDate: Date
}

export interface UpdateActivityResponse {
  id: string
  name: string
  activityDate: Date
}

export async function updateActivity({
  activityId,
  activityDate,
  title,
}: UpdateActivityRequest) {
  const response = await api.put<UpdateActivityResponse>(
    `/activities/${activityId}`,
    {
      activityDate,
      title,
    },
  )

  return response.data
}
