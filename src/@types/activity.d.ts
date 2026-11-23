import { User } from "./user"

export type Activity = {
  id: string
  name: string
  activityDate: Date
  totalAmountInCents: number
  participants: User[]
}
