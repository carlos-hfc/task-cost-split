import { User } from "@/@types/user"
import { api } from "@/lib/axios"

export interface GetAllUsersResponse {
  users: Array<User & { isInActivity: boolean }>
}

export async function getAllUsers() {
  const response = await api.get<GetAllUsersResponse>("/users")

  return response.data
}
