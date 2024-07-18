import React from "react";
import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/theme/theme";
import * as Icons from "@expo/vector-icons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

type GradientIconProps = IconProps<
  ComponentProps<(typeof Icons)[keyof typeof Icons]>["name"]
> & {
  iconSet: keyof typeof Icons;
  size?: number;
};

const GradientIcon: React.FC<GradientIconProps> = ({
  size = 28,
  name,
  color,
  iconSet,
  ...rest
}) => {
  const IconComponent = Icons[iconSet] as React.ComponentType<
    IconProps<ComponentProps<(typeof Icons)[typeof iconSet]>["name"]>
  >;

  return (
    <Pressable className="rounded-xl border-2 border-secondary-dark-grey overflow-hidden">
      <LinearGradient
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="w-9 h-9 justify-center items-center"
      >
        <IconComponent size={size} name={name} color={color} {...rest} />
      </LinearGradient>
    </Pressable>
  );
};

export default GradientIcon;
