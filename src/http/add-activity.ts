import { api } from "@/lib/axios"

export interface AddActivityRequest {
  title: string
  activityDate: Date
}

export interface AddActivityResponse {
  id: string
  name: string
  activityDate: Date
}

export async function addActivity(data: AddActivityRequest) {
  const response = await api.post<AddActivityResponse>("/activities", data)

  return response.data
}
