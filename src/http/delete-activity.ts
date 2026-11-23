import { api } from "@/lib/axios"

export interface DeleteActivityRequest {
  activityId: string
}

export async function deleteActivity({ activityId }: DeleteActivityRequest) {
  await api.delete(`/activities/${activityId}`)
}
