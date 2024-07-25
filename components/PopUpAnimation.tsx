import { StyleSheet, Text, View, StyleProp, ViewStyle } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

type PopUpAnimationProps = {
  style?: StyleProp<ViewStyle>;
  source: string;
};

const PopUpAnimation: React.FC<PopUpAnimationProps> = ({ style, source }) => {
  return (
    <View className="flex-1 absolute top-0 bottom-0 left-0 right-0 z-50 bg-secondary-black-rgba justify-center ">
      <LottieView style={style} source={source} autoPlay loop={false} />
    </View>
  );
};

export default PopUpAnimation;
