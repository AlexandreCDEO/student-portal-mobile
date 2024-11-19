import { Button } from '@/components/button'
import { Card, CardContent, CardTitle } from '@/components/card'
import { Input } from '@/components/input'
import { View, Text } from 'react-native'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { changePassword } from '@/server/change-password'
import { useLocalSearchParams, useRouter } from 'expo-router'
import axios from 'axios'
import { Alert, AlertDescription, AlertTitle } from '@/components/alert'
import { useState } from 'react'

type FormData = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ChangePassword() {
  const [showAlert, setShowAlert] = useState(false)
  const [titleAlert, setTitleAlert] = useState('')
  const [descriptionAlert, setDescriptionAlert] = useState('')

  const { id } = useLocalSearchParams()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    handleChangePassword(
      Number(id),
      data.currentPassword,
      data.newPassword,
      data.confirmPassword,
    )
  }

  function handleShowAlert(
    isShow: boolean,
    title: string,
    description: string,
  ) {
    if (isShow) {
      setTitleAlert(title)
      setDescriptionAlert(description)
      setShowAlert(true)
    } else {
      setTitleAlert('')
      setDescriptionAlert('')
      setShowAlert(false)
    }
  }

  async function handleChangePassword(
    id: number,
    password: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    try {
      const result = await changePassword({
        id,
        password,
        newPassword,
        confirmPassword,
      })

      if (result) router.replace('/')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          handleShowAlert(
            true,
            'Erro!',
            error.response.data.message ||
              'Ocorreu um erro ao processar a solicitação.',
          )
        } else if (error.request) {
          // A requisição foi enviada, mas nenhuma resposta foi recebida
          handleShowAlert(true, 'Erro!', 'Erro de rede. Verifique sua conexão.')
        } else {
          // Outro erro relacionado ao Axios
          console.error('Erro ao configurar a requisição:', error.message)
          alert('Erro desconhecido. Tente novamente.')
        }
      } else {
        // Erro fora do escopo do Axios
        handleShowAlert(true, 'Erro!', 'Erro inesperado')
      }
    }
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Card className="bg-white rounded-lg w-[80%] gap-10">
        <CardTitle className="text-blue-app">Alterar Senha</CardTitle>
        {showAlert && (
          <Alert variant="destructive">
            <AlertTitle>{titleAlert}</AlertTitle>
            <AlertDescription>{descriptionAlert}</AlertDescription>
          </Alert>
        )}
        <CardContent>
          <Controller
            control={control}
            name="currentPassword"
            rules={{ required: 'A senha atual é obrigatória' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input isPassword label="Senha atual" variant="primary">
                <Input.Field
                  placeholder="Senha atual"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onFocus={() => handleShowAlert(false, '', '')}
                  value={value}
                />
              </Input>
            )}
          />
          {errors.currentPassword?.message && (
            <Text className="text-red-500">
              {errors.currentPassword.message}
            </Text>
          )}

          <Controller
            control={control}
            name="newPassword"
            rules={{ required: 'A nova senha é obrigatória' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input isPassword label="Nova senha" variant="primary">
                <Input.Field
                  placeholder="Nova senha"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onFocus={() => handleShowAlert(false, '', '')}
                  value={value}
                />
              </Input>
            )}
          />
          {errors.newPassword?.message && (
            <Text className="text-red-500">{errors.newPassword.message}</Text>
          )}

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: 'A confirmação da nova senha é obrigatória',
              validate: (value) =>
                value === getValues('newPassword') || 'As senhas não conferem', // Corrigido aqui
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input isPassword label="Confirme a Senha" variant="primary">
                <Input.Field
                  placeholder="Confirme a nova senha"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onFocus={() => handleShowAlert(false, '', '')}
                  value={value}
                />
              </Input>
            )}
          />
          {errors.confirmPassword?.message && (
            <Text className="text-red-500">
              {errors.confirmPassword.message}
            </Text>
          )}
        </CardContent>

        <Button variant="primary" onPress={handleSubmit(onSubmit)}>
          <Button.Title>CONFIRMAR</Button.Title>
        </Button>
      </Card>
    </View>
  )
}
