import React from "react";
import { Text, View } from "react-native";
type ErrorTextProps = {
  message?: string;
};

const ErrorText = ({ message = "Something went wrong!" }: ErrorTextProps) => {
  return (
    <View>
      <Text className="text-primary-white text-base font-poppins-light">
        {message}
      </Text>
    </View>
  );
};

export default ErrorText;
