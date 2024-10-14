import { createContext, ReactNode, useContext, useState } from 'react'

import clsx from "clsx";

import { Text, TextProps, Pressable , PressableProps, ActivityIndicator } from "react-native";

type Variants = "primary" | "secondary"

type ButtonProps = PressableProps & {
    variant?: Variants
    isLoading?: boolean
    children: ReactNode
}

const ThemeContext = createContext<{variant?: Variants }>({})

function Button({ variant = "primary", children, isLoading, ...rest}: ButtonProps) {
    const [isPressed, setIsPressed] = useState(false);
    
    return <Pressable             
                className={clsx(
                    "w-full h-14 flex-row items-center justify-center rounded-lg gap-2",
                    {
                        "bg-blue-app": variant === "primary",
                        "bg-white border border-blue-app": variant === "secondary"
                    }
                )}
                style={{ opacity: isPressed ? 0.7 : 1}}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                disabled={isLoading}
                {...rest}
            >
                <ThemeContext.Provider value={{ variant }}>
                    { isLoading ? <ActivityIndicator className='text-white'/> :  children }
                </ThemeContext.Provider>
            </Pressable>
}

function Title({ children }: TextProps) {
    const { variant } = useContext(ThemeContext)

    return <Text className={clsx(
       "text-base font-semibold ",
       {
            "text-white": variant === "primary",
            "text-blue-app": variant === "secondary"
       } 
    )}>{ children }</Text>
}

Button.Title = Title

export { Button }