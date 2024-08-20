import { View, Text, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";

type ErrorMessageProps = {
  message: string;
};
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors[colorScheme].primaryBackgroundHex,
        flex: 1,
      }}
    >
      <View className="flex-1 justify-center">
        <Text className="font-poppins-medium text-lg text-secondary-text text-center">
          {message}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ErrorMessage;
