import { Slot } from 'expo-router'

import '@/styles/global.css'
import { StatusBar } from 'expo-status-bar'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { Loading } from '@/components/loading'
import { colors } from '@/styles/colors'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ImageBackground } from 'react-native'

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.white, marginTop: 40 }}
    >
      <StatusBar style="dark" />
      <ImageBackground
        source={require('../assets/bg.png')}
        style={{ flex: 1 }}
        resizeMode="repeat"
      >
        <Slot />
      </ImageBackground>
    </GestureHandlerRootView>
  )
}
