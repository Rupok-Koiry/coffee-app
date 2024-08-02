import { View, Text } from "react-native";
import React from "react";
import GradientIcon from "./GradientIcon";
import { COLORS } from "@/theme/theme";
import ProfilePic from "./ProfilePic";
import * as Icons from "@expo/vector-icons";

type HeaderBarProps = {
  title?: string;
  iconName?: string;
  iconSet?: keyof typeof Icons;
  showProfilePic?: boolean;
  containerClassName?: string;
};

const HeaderBar = ({
  title,
  iconName = "chevron-back",
  iconSet = "Ionicons",
  showProfilePic = true,
  containerClassName,
}: HeaderBarProps) => {
  return (
    <View
      className={`flex-row justify-between items-center p-5 ${containerClassName}`}
    >
      <GradientIcon
        name={iconName}
        size={20}
        color={COLORS.primaryLightGreyHex}
        iconSet={iconSet}
      />
      {title && (
        <Text className="font-poppins-semibold text-xl text-primary-white">
          {title}
        </Text>
      )}

      {showProfilePic ? <ProfilePic /> : <View className="h-9 w-9" />}
    </View>
  );
};

export default HeaderBar;
