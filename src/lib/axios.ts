import axios from "axios"
import { Platform } from "react-native"

import { env } from "@/env"
import { AppError } from "@/utils/app-error"

const baseURL = Platform.select({
  android: `${env.EXPO_PUBLIC_API_URL}/api/v1`,
  ios: `${env.EXPO_PUBLIC_API_URL}/api/v1`,
})

export const api = axios.create({
  baseURL,
})

api.interceptors.request.use(async config => {
  return config
})

api.interceptors.response.use(
  config => config,
  error => {
    if (error.response && error.response.data) {
      return Promise.reject(
        new AppError(error.response.data.reason, error.response.status),
      )
    }

    return Promise.reject(new AppError("Falha na requisição", 400))
  },
)
