import { View, Text, Image } from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";
type LogoImageProps = {
  className?: string;
};

const LogoImage = ({ className }: LogoImageProps) => {
  const { colorScheme } = useColorScheme();

  return colorScheme === "dark" ? (
    <Image
      source={require("@/assets/app_images/logo-dark.png")}
      className={className}
    />
  ) : (
    <Image
      source={require("@/assets/app_images/logo-light.png")}
      className={className}
    />
  );
};

export default LogoImage;
