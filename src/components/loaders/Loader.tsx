import { View, Text, Dimensions } from "react-native";
import { useColorScheme } from "nativewind";
import React from "react";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

const Loader = () => {
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors[colorScheme].primaryBackgroundHex,
        flex: 1,
      }}
    >
      <View className="flex-1 justify-center">
        <LottieView
          style={{
            width: Dimensions.get("window").width / 2,
            height: Dimensions.get("window").width / 2,
            alignSelf: "center",
          }}
          source={require("@/lottie/loading.json")}
          autoPlay
          loop
        />
        <Text className="font-poppins-medium text-lg text-primary-orange text-center">
          Loading...
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Loader;
