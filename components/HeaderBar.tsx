import { View, Text } from "react-native";
import React from "react";
import GradientIcon from "./GradientIcon";
import { COLORS } from "@/theme/theme";
import ProfilePic from "./ProfilePic";
type HeaderBarProps = {
  title?: string;
};

const HeaderBar = ({ title }: HeaderBarProps) => {
  return (
    <View className="flex-row justify-between items-center p-8">
      <GradientIcon
        name="menu"
        size={16}
        color={COLORS.primaryLightGreyHex}
        iconSet="Ionicons"
      />
      {title && (
        <Text className="font-poppins-semibold text-xl text-primary-white">
          {title}
        </Text>
      )}

      <ProfilePic />
    </View>
  );
};

export default HeaderBar;
