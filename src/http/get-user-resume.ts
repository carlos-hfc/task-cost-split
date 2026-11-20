import { api } from "@/lib/axios"

export interface GetUserResumeResponse {
  totalExpensesAmountInCents: number
  paidExpensesCount: number
  activitiesCount: number
  amountToPayInCents: number
  amountPaidInCents: number
  expensesCount: number
  uniqueParticipantsCount: number
  expensesToPayCount: number
}

export async function getUserResume() {
  const response = await api.get<GetUserResumeResponse>("/users/me/statistics")

  return response.data
}
