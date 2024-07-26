import React from "react";
import { View } from "react-native";
import * as Icons from "@expo/vector-icons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

type IconSetName = keyof typeof Icons;

type IconName<T extends IconSetName> = ComponentProps<
  (typeof Icons)[T]
>["name"];

type BgIconProps<T extends IconSetName> = {
  name: IconName<T>;
  color: string;
  size: number;
  BgColor: string;
  iconSet: T;
};

const BgIcon = <T extends IconSetName>({
  name,
  color,
  size,
  BgColor,
  iconSet,
}: BgIconProps<T>) => {
  const IconComponent = Icons[iconSet] as React.ComponentType<
    IconProps<IconName<T>>
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
