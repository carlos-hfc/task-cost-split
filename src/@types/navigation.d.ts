import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type PublicStackParamsList = {
  login: undefined
  register: undefined
}

export type ActivityStackParamsList = {
  list: undefined
  details:
    | undefined
    | {
        id?: string
      }
}

export type PrivateStackParamsList = {
  summary: undefined
  participants: undefined
  activities: NavigatorScreenParams<ActivityStackParamsList>
}

export type ActivityStackScreenProps<T extends keyof ActivityStackParamsList> =
  CompositeScreenProps<
    NativeStackScreenProps<ActivityStackParamsList, T>,
    BottomTabScreenProps<PrivateStackParamsList>
  >

export type PrivateTabScreenProps<T extends keyof PrivateStackParamsList> =
  BottomTabScreenProps<PrivateStackParamsList, T>

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends PublicStackParamsList, PrivateStackParamsList {}
  }
}
