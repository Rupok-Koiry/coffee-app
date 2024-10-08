import React from "react";
import { useColorScheme } from "nativewind";
import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import * as Icons from "@expo/vector-icons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

type IconSetName = keyof typeof Icons;

type IconName<T extends IconSetName> = ComponentProps<
  (typeof Icons)[T]
>["name"];

type GradientIconProps<T extends IconSetName> = {
  name: IconName<T>;
  color: string;
  size?: number;
  width?: number;
  height?: number;
  iconSet: T;
};

const GradientIcon = <T extends IconSetName>({
  size = 28,
  name,
  color,
  iconSet,
  width = 10,
  height = 10,
  ...rest
}: GradientIconProps<T>) => {
  const IconComponent = Icons[iconSet] as React.ComponentType<
    IconProps<IconName<T>>
  >;
  const { colorScheme } = useColorScheme();

  return (
    <LinearGradient
      colors={[
        Colors[colorScheme].secondaryGreyHex,
        Colors[colorScheme].primaryBackgroundHex,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className={`w-${width} h-${height} justify-center items-center`}
      style={{ borderRadius: 12 }}
    >
      <IconComponent size={size} name={name} color={color} {...rest} />
    </LinearGradient>
  );
};

export default GradientIcon;
