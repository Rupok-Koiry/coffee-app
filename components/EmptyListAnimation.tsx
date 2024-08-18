import { Dimensions, Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import React from "react";
import LottieView from "lottie-react-native";

type EmptyListAnimationProps = {
  title: string;
};

const EmptyListAnimation: React.FC<EmptyListAnimationProps> = ({ title }) => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="justify-center items-center px-5">
      <LottieView
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").width,
          alignSelf: "center",
        }}
        source={require("@/lottie/coffeecup.json")}
        autoPlay
        loop
      />
      <Text className="font-poppins-medium text-lg text-primary-orange text-center">
        {title}
      </Text>
    </View>
  );
};

export default EmptyListAnimation;
