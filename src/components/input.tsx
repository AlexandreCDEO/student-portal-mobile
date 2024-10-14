import { createContext, useContext, ReactNode, useState } from 'react'
import { TextInput, TextInputProps, View, Platform, Text } from 'react-native'
import clsx from 'clsx'
import { colors } from '@/styles/colors'
import { EyeOff, Eye } from 'lucide-react-native'

type Variants = 'primary' | 'secondary' | 'tertiary'

type InputProps = {
  children: ReactNode
  variant?: Variants
  label?: string
  className?: string
  isPassword?: boolean
}

const ThemeContext = createContext<{ isPassword?: boolean }>({})

function Input({
  children,
  variant = 'primary',
  label,
  isPassword = false,
  className,
}: InputProps) {
  return (
    <View className="w-full">
      {label && (
        <Text className=" mb-2 text-sm text-zinc-400 font-semibold">
          {label}
        </Text>
      )}
      <View
        className={clsx(
          'w-full h-10 flex-row items-center gap-2',
          {
            'h-14 px-4 rounded-lg border border-zinc-800':
              variant !== 'primary',
            'bg-zinc-950': variant === 'secondary',
            'bg-zinc-900': variant === 'tertiary',
          },
          className,
        )}
      >
        <ThemeContext.Provider value={{ isPassword }}>
          {children}
        </ThemeContext.Provider>
      </View>
    </View>
  )
}

function Field({ ...rest }: TextInputProps) {
  const { isPassword } = useContext(ThemeContext)
  const [isShowPassword, setIsShowPassword] = useState(false)

  function toogleVisibilityPassword() {
    setIsShowPassword(!isShowPassword)
  }

  return (
    <View className=" flex-row w-full p-2 rounded-lg border border-gray-appBorder">
      <TextInput
        className="flex-1 text-zinc-500 text-lg"
        cursorColor={colors.blue.app}
        selectionColor={Platform.OS === 'ios' ? colors.blue.app : undefined}
        {...rest}
        secureTextEntry={isPassword && !isShowPassword}
      />
      {isPassword && (
        <>
          {isShowPassword ? (
            <Eye
              onPress={toogleVisibilityPassword}
              size={16}
              color={colors.blue.app}
            />
          ) : (
            <EyeOff
              onPress={toogleVisibilityPassword}
              size={16}
              color={colors.blue.app}
            />
          )}
        </>
      )}
    </View>
  )
}

Input.Field = Field

export { Input }
