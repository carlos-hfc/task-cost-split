import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { Platform } from "react-native"

import { env } from "@/env"
import { STORAGE_USER } from "@/storage"
import { AppError } from "@/utils/app-error"

const baseURL = Platform.select({
  android: `${env.EXPO_PUBLIC_API_URL}/api/v1`,
  ios: `${env.EXPO_PUBLIC_API_URL}/api/v1`,
})

export const api = axios.create({
  baseURL,
})

api.interceptors.request.use(async config => {
  if (env?.EXPO_PUBLIC_API_TIMEOUT) {
    await new Promise(resolve =>
      setTimeout(resolve, env.EXPO_PUBLIC_API_TIMEOUT),
    )
  }

  const storageData = await AsyncStorage.getItem(STORAGE_USER)

  if (storageData) {
    const { token } = JSON.parse(storageData) as { token: string }

    if (token) config.headers.Authorization = `Bearer ${token}`
  }

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
