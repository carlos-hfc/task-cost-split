import axios from "axios"
import { Platform } from "react-native"

import { env } from "@/env"

const baseURL = Platform.select({
  android: env.EXPO_PUBLIC_API_URL,
  ios: env.EXPO_PUBLIC_API_URL,
})

export const api = axios.create({
  baseURL,
})

api.interceptors.request.use(async config => {
  return config
})
