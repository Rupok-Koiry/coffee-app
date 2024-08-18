import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";
import GradientIcon from "./GradientIcon";
import { Colors } from "@/constants/Colors";
import * as Icons from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

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
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  return (
    <View
      className={`flex-row justify-between items-center p-5 pb-5 ${containerClassName}`}
    >
      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

          router.back();
        }}
      >
        <GradientIcon
          name={iconName}
          size={20}
          color={Colors[colorScheme].accentTextHex}
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
