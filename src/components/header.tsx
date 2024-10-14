import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { GraduationCap, User, Settings, LogOut, Menu } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Modal } from './modal';
import ChangePassword from './change-password';

export function Header() {
  const navigation = useNavigation();
  const router = useRouter();
  const slideAnimation = useRef(new Animated.Value(0)).current;
  
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const toggleMenu = () => navigation.dispatch(DrawerActions.toggleDrawer());
  
  const toggleDropdown = () => {
    if (!isDropdownVisible) {
      setIsDropdownVisible(true);
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setIsDropdownVisible(false));
    }
  };

  const dropdownTranslateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 0],
  });

  const toggleModal = () => setModalVisible(!isModalVisible);

  return (
    <>
      {/* Header */}
      <View
        onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}
        className="bg-blue-app px-4 py-3 flex-row justify-between items-center relative z-10"
      >
        <Pressable onPress={toggleMenu} className="p-2">
          <Menu color="white" size={28} />
        </Pressable>

        <View className="flex-row items-center">
          <GraduationCap color="white" size={28} />
          <Text className="text-white font-bold text-xl ml-3 tracking-wide">
            Send
          </Text>
        </View>

        <Pressable className="bg-white/10 rounded-full p-2" onPress={toggleDropdown}>
          <User color="white" size={24} />
        </Pressable>
      </View>

      {/* Dropdown Menu */}
      {isDropdownVisible && (
        <>
          <TouchableWithoutFeedback onPress={toggleDropdown}>
            <View className="absolute inset-0 z-10" />
          </TouchableWithoutFeedback>

          <Animated.View
            style={{
              top: headerHeight,
              transform: [{ translateY: dropdownTranslateY }],
            }}
            className="absolute right-0 bg-white rounded-lg shadow-lg overflow-hidden z-20"
          >
            <Pressable
              className="flex-row items-center px-4 py-3 border-b border-gray-200"
              onPress={() => {
                toggleDropdown();
                toggleModal(); // Abrir o modal
              }}
            >
              <Settings color={colors.blue.app} size={20} />
              <Text className="ml-3 text-gray-700 text-sm">Alterar Senha</Text>
            </Pressable>

            <Pressable
              className="flex-row items-center px-4 py-3 border-b border-gray-200"
              onPress={() => {
                console.log('Meus Dados');
                toggleDropdown();
              }}
            >
              <User color={colors.blue.app} size={20} />
              <Text className="ml-3 text-gray-700 text-sm">Meus Dados</Text>
            </Pressable>

            <Pressable
              className="flex-row items-center px-4 py-3"
              onPress={() => {
                toggleDropdown();
                router.replace('/')
              }}
            >
              <LogOut color={colors.blue.app} size={20} />
              <Text className="ml-3 text-gray-700 text-sm">Sair</Text>
            </Pressable>
          </Animated.View>
        </>
      )}

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        title="Alterar senha"
        onClose={toggleModal}
      >
        <ChangePassword />
      </Modal>
    </>
  );
}
