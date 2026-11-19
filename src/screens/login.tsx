import { zodResolver } from "@hookform/resolvers/zod"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useMutation } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { Image, Text, View } from "react-native"
import z from "zod"

import { PublicStackParamsList } from "@/@types/navigation"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { useAuthContext } from "@/contexts/auth-context"
import { useAppError } from "@/hooks/use-app-error"
import { signIn } from "@/http/sign-in"

const loginSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z
    .string("A senha é obrigatória")
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
})

type LoginSchema = z.infer<typeof loginSchema>

export function Login({
  navigation,
}: NativeStackScreenProps<PublicStackParamsList>) {
  const { saveData, toggleLoading } = useAuthContext()
  const { handleError } = useAppError()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const { mutateAsync: signInFn } = useMutation({
    mutationFn: signIn,
  })

  async function handleAuthenticate(data: LoginSchema) {
    toggleLoading(true)
    try {
      const { token, ...user } = await signInFn(data)

      saveData({
        token,
        user,
      })
    } catch (error) {
      handleError(error)
    } finally {
      toggleLoading(false)
    }
  }

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center gap-2">
        <Image
          source={require("@/assets/logo.png")}
          alt="Logo do TaskCost Split"
          className="size-16"
        />

        <Text className="font-sora text-green-base text-lg">
          TaskCost <Text className="text-green-light">Split</Text>
        </Text>
      </View>

      <View className="bg-gray-700 px-8 py-10 rounded-t-3xl gap-8">
        <Text className="font-inter-semibold text-gray-100 text-xl self-center">
          Entre no app
        </Text>

        <View className="gap-3">
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Input
                placeholder="E-mail"
                icon="mail"
                autoCapitalize="none"
                inputMode="email"
                value={field.value}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <Input
                placeholder="Senha"
                icon="asterisk"
                value={field.value}
                onChangeText={field.onChange}
                secureTextEntry
                error={fieldState.error?.message}
              />
            )}
          />
        </View>

        <Button
          disabled={isSubmitting}
          onPress={() => handleSubmit(handleAuthenticate)()}
        >
          Entrar
        </Button>

        <View className="h-px bg-gray-600" />

        <View className="gap-4">
          <Text className="font-inter text-sm self-center text-gray-200">
            Ainda não tem cadastro?
          </Text>

          <Button
            variant="secondary"
            onPress={() => navigation.navigate("register")}
          >
            Criar conta
          </Button>
        </View>
      </View>
    </View>
  )
}
