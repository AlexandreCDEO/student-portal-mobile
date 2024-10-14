import { X } from "lucide-react-native";
import {
  View,
  Text,
  ModalProps,
  ScrollView,
  Modal as RNModal,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import { colors } from "@/styles/colors";

type Props = ModalProps & {
  title: string;
  subtitle?: string;
  onClose?: () => void;
};

export function Modal({
  title,
  subtitle = "",
  onClose,
  children,
  ...rest
}: Props) {
  return (
    <RNModal transparent animationType="fade" {...rest}>
      <BlurView
        className="flex-1 justify-center items-center"
        intensity={10}
        tint="dark"
        experimentalBlurMethod="dimezisBlurView"
      >
        {/* Overlay com Blur */}
        <View className="bg-black/40 absolute inset-0" />

        {/* Conteúdo do Modal */}
        <View className="bg-white w-5/6 max-w-md rounded-lg border border-gray-300 p-6 shadow-lg">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-gray-500 ml-5 font-medium text-xl">{title}</Text>

              {onClose && (
                <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
                  <X color={colors.blue.app} size={24} />
                </TouchableOpacity>
              )}
            </View>

            {subtitle.trim().length > 0 && (
              <Text className="text-gray-400 font-regular leading-6 mb-4 ml-5">
                {subtitle}
              </Text>
            )}

            {children}
          </ScrollView>
        </View>
      </BlurView>
    </RNModal>
  );
}
