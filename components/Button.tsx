import React from "react";
import {
  Text,
  TouchableOpacity,
  Linking,
  GestureResponderEvent,
} from "react-native";

type ButtonProps = {
  href?: string;
  onPress?: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  containerClassName?: string;
  textClassName?: string;
};

const Button: React.FC<ButtonProps> = ({
  href,
  onPress,
  children,
  containerClassName = "",
  textClassName = "",
}) => {
  const handlePress = (event: GestureResponderEvent) => {
    if (href) {
      Linking.openURL(href);
    } else if (onPress) {
      onPress(event);
    }
  };
  return (
    <TouchableOpacity
      className={`bg-primary-orange items-center justify-center rounded-2xl px-5 py-3 ${containerClassName}`}
      onPress={handlePress}
    >
      <Text
        className={`font-poppins-semibold text-base text-primary-white ${textClassName}`}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
