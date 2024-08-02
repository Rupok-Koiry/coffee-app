import { Dimensions, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

interface EmptyListAnimationProps {
  title: string;
}

const EmptyListAnimation: React.FC<EmptyListAnimationProps> = ({ title }) => {
  return (
    <View className="flex-1 justify-center items-center px-5">
      <LottieView
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").width,
          alignSelf: "center",
        }}
        source={require("../lottie/coffee.json")}
        autoPlay
        loop
      />
      <Text className="font-poppins-medium text-lg text-primary-orange text-center -mt-20">
        {title}
      </Text>
    </View>
  );
};

export default EmptyListAnimation;
