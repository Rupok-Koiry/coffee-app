// ThemeWrapper.tsx
import { useThemeColor } from "@/hooks/themes/useThemeColor";
import React from "react";
import { View, StyleSheet } from "react-native";

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const colors = useThemeColor();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      "--color-primary-red": colors.primaryRedHex,
      "--color-primary-orange": colors.primaryOrangeHex,
      "--color-primary-background": colors.primaryBackgroundHex,
      "--color-secondary-background": colors.secondaryBackgroundHex,
      "--color-tertiary-background": colors.tertiaryBackgroundHex,
      "--color-primary-grey": colors.primaryGreyHex,
      "--color-secondary-grey": colors.secondaryGreyHex,
      "--color-primary-text": colors.primaryTextHex,
      "--color-secondary-text": colors.secondaryTextHex,
      "--color-tertiary-text": colors.tertiaryTextHex,
      "--color-accent-text": colors.accentTextHex,
      "--color-success-green": colors.successGreenHex,
      "--color-primary-overlay": colors.primaryOverlayRGBA,
      "--color-secondary-overlay": colors.secondaryOverlayRGBA,
    },
  });

  return <View style={styles.container}>{children}</View>;
};
