import React from "react";
import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/theme/theme";
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
  width = 9,
  height = 9,
  ...rest
}: GradientIconProps<T>) => {
  const IconComponent = Icons[iconSet] as React.ComponentType<
    IconProps<IconName<T>>
  >;

  return (
    <Pressable className="rounded-xl border-2 border-secondary-dark-grey overflow-hidden">
      <LinearGradient
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className={`w-${width} h-${height} justify-center items-center`}
      >
        <IconComponent size={size} name={name} color={color} {...rest} />
      </LinearGradient>
    </Pressable>
  );
};

export default GradientIcon;
