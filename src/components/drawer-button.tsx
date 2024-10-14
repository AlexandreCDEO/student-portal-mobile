import React from 'react';

import { Pressable, PressableProps, View, Text } from "react-native";
import { colors } from "@/styles/colors";
import clsx from 'clsx'
import * as LucideIcons from 'lucide-react-native'

export type IconNameProps = keyof typeof LucideIcons;

type DrawerButtonProps = PressableProps & {
    title: string
    isFocused?: boolean
    isDivider?: boolean
    iconName: IconNameProps
}

export function DrawerButton({title, isFocused, isDivider, iconName, ...rest}: DrawerButtonProps) {

    const IconComponent = LucideIcons[iconName] as React.ComponentType<{
        size?: number;
        color?: string;
        [key: string]: any;
    }>;

    if (!IconComponent) {
        console.warn(`Icon "${iconName}" not found in lucide-react-native.`);
        return null;
      }

    return(
        <Pressable className={clsx("w-full", {
            "border-b ml-10 border-gray-500": isDivider
            })}
            {...rest}
        >
            <View className={clsx("flex-row items-center gap-4 h-14 px-6 -ml-2", {
                "-ml-12": isDivider,
                "bg-gray-100 rounded-r-full": isFocused
            })}>
                <IconComponent size={20} color={isFocused ? colors.blue.app: '#6b7280'}/>
                <Text style={{ color: isFocused ? colors.blue.app: '#6b7280'}} className={clsx("font-subtitle text-base flex-1")}>{ title }</Text>
            </View>
        </Pressable>
    )
}