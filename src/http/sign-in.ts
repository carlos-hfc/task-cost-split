import { User } from "@/@types/user"
import { api } from "@/lib/axios"

export interface SignInRequest {
  email: string
  password: string
}

export interface SignInResponse extends User {
  token: string
}

export async function signIn(data: SignInRequest) {
  const response = await api.post<SignInResponse>("/users/sign-in", data)

  return response.data
}
