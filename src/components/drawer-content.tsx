import { ScrollView, Text, View } from 'react-native'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { GraduationCap } from 'lucide-react-native'
import { colors } from '@/styles/colors'
import { DrawerButton } from '@/components/drawer-button'
import { CustomOptions } from '@/types/navigation'

export function DrawerContent(drawerProps: DrawerContentComponentProps) {
  return (
    <View className="flex-1 overflow-hidden">
      <View className="flex-row gap-2 items-center justify-center mt-5 w-full border-b pb-6 border-blue-app">
        <GraduationCap color={colors.blue.app} size={30} />
        <Text className="font-bold text-blue-app text-xl ml-3 tracking-wide">
          Send
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 42,
        }}
      >
        <View className="mt-2">
          {drawerProps.state.routes.map((route, index) => {
            const isFocused = drawerProps.state.index === index
            const options = drawerProps.descriptors[route.key]
              .options as CustomOptions

            if (options.title === undefined) {
              return undefined
            }

            const onPress = () => {
              const event = drawerProps.navigation.emit({
                type: 'drawerItemPress',
                canPreventDefault: true,
                target: route.key,
              })

              if (!isFocused && !event?.defaultPrevented) {
                drawerProps.navigation.navigate(route.name, route.params)
              }
            }

            return (
              <View key={route.key}>
                {options.sectionTitle && (
                  <Text className="text-gray-400 text-sm font-heading uppercase ml-4 mt-4">
                    {options.sectionTitle}
                  </Text>
                )}
                <DrawerButton
                  onPress={onPress}
                  title={options.title}
                  iconName={options.iconName}
                  isDivider={options.isDivider}
                  isFocused={isFocused}
                />
              </View>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}
