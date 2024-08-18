import { View, Text, Dimensions } from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ErrorMessageProps = {
  message: string;
};
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView className="flex-1 bg-primary-black">
      <View className="flex-1 justify-center">
        <Text className="font-poppins-medium text-lg text-secondary-light-grey text-center">
          {message}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ErrorMessage;
