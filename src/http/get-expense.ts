import { Expense } from "@/@types/expense"
import { ExpenseStatusType } from "@/components/expense-status"
import { api } from "@/lib/axios"

export interface GetExpenseRequest {
  expenseId: string
}

export interface GetExpenseResponse extends Expense {
  activityId: string
  activityName: string
  payments: {
    id: string
    debtorId: string
    debtorName: string
    amountPaidInCents: number
    paidAt: Date
  }[]
  participants: {
    userId: string
    name: string
    email: string
    remainingDebtInCents: number
    paymentStatus: ExpenseStatusType
    amountPaidInCents: number
    amountOwedInCents: number
  }[]
  payer: {
    userId: string
    name: string
    email: string
  }
}

export async function getExpense({ expenseId }: GetExpenseRequest) {
  const response = await api.get<GetExpenseResponse>(`/expenses/${expenseId}`)

  return response.data
}
