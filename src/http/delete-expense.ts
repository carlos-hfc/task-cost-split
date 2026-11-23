import { api } from "@/lib/axios"

export interface DeleteExpenseRequest {
  expenseId: string
}

export async function deleteExpense({ expenseId }: DeleteExpenseRequest) {
  await api.delete(`/expenses/${expenseId}`)
}
