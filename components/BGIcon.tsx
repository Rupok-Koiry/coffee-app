import { Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

type BGIconProps = IconProps<ComponentProps<typeof Ionicons>["name"]> & {
  BGColor: string;
};

const BGIcon: React.FC<BGIconProps> = ({ name, color, size, BGColor }) => {
  return (
    <View
      className={`h-8 w-8 justify-center items-center rounded-lg`}
      style={{ backgroundColor: BGColor }}
    >
      <Ionicons name={name} color={color} size={size} />
    </View>
  );
};

export default BGIcon;
