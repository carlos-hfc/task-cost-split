import { Image, Text, View } from "react-native"

import { Button } from "@/components/button"
import { Input } from "@/components/input"

export function Login() {
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
          <Input
            placeholder="E-mail"
            icon="mail"
          />

          <Input
            placeholder="Senha"
            icon="asterisk"
          />
        </View>

        <Button>Entrar</Button>

        <View className="h-px bg-gray-600" />

        <View className="gap-4">
          <Text className="font-inter text-sm self-center text-gray-200">
            Ainda não tem cadastro?
          </Text>

          <Button variant="secondary">Criar conta</Button>
        </View>
      </View>
    </View>
  )
}
