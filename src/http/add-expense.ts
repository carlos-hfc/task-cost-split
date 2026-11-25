import { Expense } from "@/@types/expense"
import { api } from "@/lib/axios"

export interface AddExpenseRequest {
  activityId: string
  payerId: string
  title: string
  amountInCents: number
  participantsIds: string[]
}

export interface AddExpenseResponse extends Expense {
  activityId: string
  payerId: string
  payerName: string
  participants: {
    userName: string
    amountOwedInCents: number
    userId: string
  }[]
}

export async function addExpense({
  activityId,
  ...data
}: AddExpenseRequest): Promise<AddExpenseResponse> {
  const response = await api.post<AddExpenseResponse>(
    `/activities/${activityId}/expenses`,
    data,
  )

  return response.data
}
