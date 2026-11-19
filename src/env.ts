import { z } from "zod"

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.url(),
  EXPO_PUBLIC_API_TIMEOUT: z.coerce.number().optional(),
})

export const env = envSchema.parse(process.env)
