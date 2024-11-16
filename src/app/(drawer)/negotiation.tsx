import { BackButton } from '@/components/back-button'
import { Text, View } from 'react-native'

export default function Negotiation() {
  return (
    <>
      <BackButton />
      <View className="flex-1 items-center justify-center">
        <Text className="text-blue-app font-heading text-2xl">Negociação</Text>
      </View>
    </>
  )
}
