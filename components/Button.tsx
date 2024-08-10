import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, GestureResponderEvent } from "react-native";

type ButtonProps = {
  href?: string;
  onPress?: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  outline?: boolean;
  containerClassName?: string;
  textClassName?: string;
};

const Button: React.FC<ButtonProps> = ({
  href,
  onPress,
  children,
  outline = false,
  containerClassName = "",
  textClassName = "",
}) => {
  const router = useRouter();
  const handlePress = (event: GestureResponderEvent) => {
    if (href) {
      router.push(href);
    } else if (onPress) {
      onPress(event);
    }
  };
  return (
    <TouchableOpacity
      className={`justify-center items-center rounded-2xl ${containerClassName} ${
        outline
          ? "border-2 border-primary-orange py-2 px-5"
          : "bg-primary-orange px-5 py-3"
      }`}
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
