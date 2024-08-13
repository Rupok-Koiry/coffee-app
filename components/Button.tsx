import { Href, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, GestureResponderEvent } from "react-native";
import * as Haptics from "expo-haptics";

type ButtonProps = {
  href?: Href<string>;
  onPress?: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  outline?: boolean;
  containerClassName?: string;
  textClassName?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  href,
  onPress,
  children,
  outline = false,
  disabled = false,
  containerClassName = "",
  textClassName = "",
}) => {
  const router = useRouter();

  const handlePress = (event: GestureResponderEvent) => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (href) {
      router.push(href);
    } else if (onPress) {
      onPress(event);
    }
  };

  return (
    <TouchableOpacity
      className={`justify-center items-center rounded-2xl px-5 py-3 ${
        outline
          ? `border-2  ${
              disabled
                ? "border-primary-grey bg-primary-dark-grey"
                : "border-primary-orange"
            }`
          : ` ${disabled ? "bg-primary-grey" : "bg-primary-orange"}`
      } ${containerClassName}`}
      onPress={handlePress}
      activeOpacity={disabled ? 1 : 0.8}
      disabled={disabled}
    >
      <Text
        className={`font-poppins-regular  text-base ${
          disabled ? "text-primary-dark-grey" : "text-primary-white"
        } ${textClassName}`}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
