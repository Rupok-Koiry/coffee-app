import React, { createContext } from "react";
import { View } from "react-native";
import { useColorScheme, vars } from "nativewind";
import { Colors } from "@/constants/Colors";

export const themes = {
  light: vars({
    "--color-primary-red": Colors.light.primaryRedHex,
    "--color-primary-orange": Colors.light.primaryOrangeHex,
    "--color-primary-background": Colors.light.primaryBackgroundHex,
    "--color-secondary-background": Colors.light.secondaryBackgroundHex,
    "--color-tertiary-background": Colors.light.tertiaryBackgroundHex,
    "--color-primary-grey": Colors.light.primaryGreyHex,
    "--color-secondary-grey": Colors.light.secondaryGreyHex,
    "--color-primary-text": Colors.light.primaryTextHex,
    "--color-secondary-text": Colors.light.secondaryTextHex,
    "--color-tertiary-text": Colors.light.tertiaryTextHex,
    "--color-accent-text": Colors.light.accentTextHex,
    "--color-success-green": Colors.light.successGreenHex,
    "--color-primary-overlay": Colors.light.primaryOverlayRGBA,
    "--color-secondary-overlay": Colors.light.secondaryOverlayRGBA,
  }),
  dark: vars({
    "--color-primary-red": Colors.dark.primaryRedHex,
    "--color-primary-orange": Colors.dark.primaryOrangeHex,
    "--color-primary-background": Colors.dark.primaryBackgroundHex,
    "--color-secondary-background": Colors.dark.secondaryBackgroundHex,
    "--color-tertiary-background": Colors.dark.tertiaryBackgroundHex,
    "--color-primary-grey": Colors.dark.primaryGreyHex,
    "--color-secondary-grey": Colors.dark.secondaryGreyHex,
    "--color-primary-text": Colors.dark.primaryTextHex,
    "--color-secondary-text": Colors.dark.secondaryTextHex,
    "--color-tertiary-text": Colors.dark.tertiaryTextHex,
    "--color-accent-text": Colors.dark.accentTextHex,
    "--color-success-green": Colors.dark.successGreenHex,
    "--color-primary-overlay": Colors.dark.primaryOverlayRGBA,
    "--color-secondary-overlay": Colors.dark.secondaryOverlayRGBA,
  }),
};
interface ThemeProviderProps {
  children: React.ReactNode;
}
export const ThemeContext = createContext<{
  theme: "light" | "dark";
}>({
  theme: "light",
});
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { colorScheme } = useColorScheme();
  return (
    <ThemeContext.Provider value={{ theme: colorScheme }}>
      <View style={themes[colorScheme]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};
