export type PublicStackParamsList = {
  login: undefined
  register: undefined
}

export type PrivateStackParamsList = {
  summary: undefined
  activities: undefined
  participants: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends PublicStackParamsList, PrivateStackParamsList {}
  }
}
