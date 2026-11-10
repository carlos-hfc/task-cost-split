import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Image, Text, View } from "react-native"

import { PublicStackParamsList } from "@/@types/navigation"
import { Button } from "@/components/button"
import { Input } from "@/components/input"

export function Register({
  navigation,
}: NativeStackScreenProps<PublicStackParamsList>) {
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
          Crie sua conta
        </Text>

        <View className="gap-3">
          <Input
            placeholder="Nome"
            icon="user-circle"
          />

          <Input
            placeholder="E-mail"
            icon="mail"
          />

          <Input
            placeholder="Senha"
            icon="asterisk"
          />
        </View>

        <Button>Cadastrar</Button>

        <View className="h-px bg-gray-600" />

        <View className="gap-4">
          <Text className="font-inter text-sm self-center text-gray-200">
            Já tem cadastro?
          </Text>

          <Button
            variant="secondary"
            onPress={() => navigation.goBack()}
          >
            Entrar na conta
          </Button>
        </View>
      </View>
    </View>
  )
}
