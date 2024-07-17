import { View, Text, Pressable } from "react-native";
import React from "react";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

const GradientIcon = ({
  size = 28,
  name,
  color,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) => {
  return (
    <Pressable className="rounded-xl border-2 border-secondary-dark-grey overflow-hidden">
      <LinearGradient
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="w-9 h-9 justify-center items-center"
      >
        <TabBarIcon size={size} name={name} color={color} {...rest} />
      </LinearGradient>
    </Pressable>
  );
};

export default GradientIcon;
