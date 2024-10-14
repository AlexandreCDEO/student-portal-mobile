import { BackButton } from '@/components/back-button';
import { DrawerContent } from '@/components/drawer-content'
import { Header } from '@/components/header';
import { colors } from '@/styles/colors';
import { CustomOptions } from '@/types/navigation'
import { Drawer } from 'expo-router/drawer'
import { SafeAreaView, View } from 'react-native';


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
                                width: "75%"
                            }
                        }}
                        drawerContent={(props) => <DrawerContent {...props}/>}
                        backBehavior='history'
                    >

                        <Drawer.Screen 
                            name='dependencie'
                            options={{ title: "Dependências", iconName: "Link", isDivider: false, sectionTitle: 'Aulas' } as CustomOptions}
                        />

                        <Drawer.Screen 
                            name='grade'
                            options={{ title: "Notas e Faltas", iconName: "FileText", isDivider: false} as CustomOptions}
                        />
                    </Drawer>
                </View>
            </SafeAreaView>
        </>
        // </View>
    )
}