import { ExpenseStatusType } from "@/components/expense-status"
import { api } from "@/lib/axios"

export interface ToggleExpenseStatusRequest {
  expenseId: string
  participantId: string
}

export interface ToggleExpenseStatusResponse {
  expenseId: string
  participantId: string
  participantName: string
  participantEmail: string
  paymentStatus: ExpenseStatusType
  amountPaidInCents: number
  amountOwedInCents: number
  remainingDebtInCents: number
}

export async function toggleExpenseStatus({
  expenseId,
  participantId,
}: ToggleExpenseStatusRequest) {
  const response = await api.put<ToggleExpenseStatusResponse>(
    `/expenses/${expenseId}/participants/${participantId}/payment/toggle`,
  )

  console.log(response.data)

  return response.data
}
