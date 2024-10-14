import React from 'react'
import { Pressable, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'lucide-react-native'
import { colors } from '@/styles/colors'

export function BackButton() {
  const navigation = useNavigation()

  return (
    <View className="absolute top-4 left-4 z-10">
      <Pressable
        onPress={() => navigation.goBack()}
        className="p-2 rounded-3xl bg-gray-200"
      >
        <ArrowLeft size={24} color={colors.blue.app} />
      </Pressable>
    </View>
  )
}
