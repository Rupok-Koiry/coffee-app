import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import GradientIcon from "./GradientIcon";
import { COLORS } from "@/theme/theme";
import ProfilePic from "./ProfilePic";
import * as Icons from "@expo/vector-icons";
import { useRouter } from "expo-router";

type HeaderBarProps = {
  title?: string;
  iconName?: string;
  iconSet?: keyof typeof Icons;
  containerClassName?: string;
};

const HeaderBar = ({
  title,
  iconName = "chevron-back",
  iconSet = "Ionicons",
  containerClassName,
}: HeaderBarProps) => {
  const router = useRouter();
  return (
    <View
      className={`flex-row justify-between items-center px-5 py-3 ${containerClassName}`}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <GradientIcon
          name={iconName}
          size={20}
          color={COLORS.primaryLightGreyHex}
          iconSet={iconSet}
        />
      </TouchableOpacity>
      {title && (
        <Text className="font-poppins-semibold text-xl text-primary-white">
          {title}
        </Text>
      )}
      <View className="h-9 w-9" />
    </View>
  );
};

export default HeaderBar;
