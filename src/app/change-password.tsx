import { Button } from '@/components/button'
import { Card, CardContent, CardTitle } from '@/components/card'
import { Input } from '@/components/input'
import { View } from 'react-native'

export default function ChangePassword() {
  return (
    <View className="flex-1 items-center justify-center">
      <Card className="bg-white rounded-lg w-[80%] gap-10">
        <CardTitle className="text-blue-app">Alterar Senha</CardTitle>
        <CardContent>
          <Input isPassword label="Senha atual" variant="primary">
            <Input.Field placeholder="Senha atual" />
          </Input>
          <Input isPassword label="Nova senha" variant="primary">
            <Input.Field placeholder="Nova senha" />
          </Input>
          <Input isPassword label="Confirme a Senha" variant="primary">
            <Input.Field placeholder="Confirme a nova senha" />
          </Input>
        </CardContent>
        <Button variant="primary">
          <Button.Title>CONFIRMAR</Button.Title>
        </Button>
      </Card>
    </View>
  )
}
