import { DrawerContent } from '@/components/drawer-content'
import { Header } from '@/components/header'
import { colors } from '@/styles/colors'
import { CustomOptions } from '@/types/navigation'
import { Drawer } from 'expo-router/drawer'
import { SafeAreaView, View } from 'react-native'

export default function DrawerLayout() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <Header />
        </View>
        <View style={{ flex: 1, backgroundColor: colors.white }}>
          <Drawer
            screenOptions={{
              headerShown: false,
              drawerStyle: {
                width: '75%',
              },
            }}
            drawerContent={(props) => <DrawerContent {...props} />}
            backBehavior="history"
          >
            <Drawer.Screen
              name="dashboard"
              options={
                {
                  title: 'Início',
                  iconName: 'Home',
                  isDivider: false,
                } as CustomOptions
              }
            />

            <Drawer.Screen
              name="academic-calendar"
              options={
                {
                  title: 'Calendário acadêmico',
                  iconName: 'CalendarClock',
                  isDivider: false,
                } as CustomOptions
              }
            />

            <Drawer.Screen
              name="grade"
              options={
                {
                  title: 'Notas e Faltas',
                  iconName: 'FileText',
                  isDivider: false,
                  sectionTitle: 'Aulas',
                } as CustomOptions
              }
            />

            <Drawer.Screen
              name="dependencie"
              options={
                {
                  title: 'Dependências',
                  iconName: 'Link',
                  isDivider: false,
                } as CustomOptions
              }
            />

            <Drawer.Screen
              name="negotiation"
              options={
                {
                  title: 'Negociação',
                  iconName: 'Handshake',
                  isDivider: true,
                } as CustomOptions
              }
            />
          </Drawer>
        </View>
      </SafeAreaView>
    </>
  )
}
