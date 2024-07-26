import { Dimensions, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

interface EmptyListAnimationProps {
  title: string;
}

const EmptyListAnimation: React.FC<EmptyListAnimationProps> = ({ title }) => {
  return (
    <View className="flex-1 justify-center">
      <LottieView
        style={{
          width: Dimensions.get("window").width / 2,
          height: Dimensions.get("window").width / 2,
          alignSelf: "center",
        }}
        source={require("../lottie/coffeecup.json")}
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
