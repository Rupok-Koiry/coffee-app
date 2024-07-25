import React from "react";
import { View } from "react-native";
import * as Icons from "@expo/vector-icons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

type BgIconProps = {
  name: string;
  color: string;
  size: number;
  BgColor: string;
  iconSet: keyof typeof Icons;
};
const BgIcon: React.FC<BgIconProps> = ({
  name,
  color,
  size,
  BgColor,
  iconSet,
}) => {
  const IconComponent = Icons[iconSet] as React.ComponentType<
    IconProps<ComponentProps<(typeof Icons)[typeof iconSet]>["name"]>
  >;

  return (
    <View
      className="h-8 w-8 justify-center items-center rounded-lg"
      style={{ backgroundColor: BgColor }}
    >
      <IconComponent name={name} color={color} size={size} />
    </View>
  );
};

export default BgIcon;
