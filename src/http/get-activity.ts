import { Activity } from "@/@types/activity"
import { Expense } from "@/@types/expense"
import { User } from "@/@types/user"
import { ExpenseStatusType } from "@/components/expense-status"
import { api } from "@/lib/axios"

export interface GetActivityRequest {
  activityId: string
}

export interface GetActivityResponse extends Activity {
  expenses: Array<
    Expense & {
      paymentStatus: ExpenseStatusType
      participants: Array<
        User & {
          paymentStatus: ExpenseStatusType
        }
      >
      payerId: string
      payerName: string
    }
  >
}

export async function getActivity({ activityId }: GetActivityRequest) {
  const response = await api.get<GetActivityResponse>(
    `/activities/${activityId}`,
  )

  return response.data
}
