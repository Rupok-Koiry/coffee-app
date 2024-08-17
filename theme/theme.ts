interface Color {
  primaryRedHex: string;
  primaryOrangeHex: string;
  primaryBlackHex: string;
  primaryDarkGreyHex: string;
  secondaryDarkGreyHex: string;
  primaryGreyHex: string;
  secondaryGreyHex: string;
  primaryLightGreyHex: string;
  secondaryLightGreyHex: string;
  primaryWhiteHex: string;
  successGreenHex: string;
  primaryBlackRGBA: string;
  secondaryBlackRGBA: string;
}

export const COLORS: Color = {
  primaryRedHex: "#DC3535",
  primaryOrangeHex: "#D17842",
  primaryBlackHex: "#0C0F14",
  primaryDarkGreyHex: "#141921",
  secondaryDarkGreyHex: "#21262E",
  primaryGreyHex: "#252A32",
  secondaryGreyHex: "#252A32",
  primaryLightGreyHex: "#52555A",
  secondaryLightGreyHex: "#AEAEAE",
  primaryWhiteHex: "#FFFFFF",
  successGreenHex: "#4BB543",
  primaryBlackRGBA: "rgba(12,15,20,0.5)",
  secondaryBlackRGBA: "rgba(0,0,0,0.7)",
};
export const LIGHT_COLORS: Color = {
  primaryRedHex: "#DC3535", // Keep the same
  primaryOrangeHex: "#D17842", // Keep the same
  primaryBlackHex: "#FFFFFF", // Inverted
  primaryDarkGreyHex: "#F5F5F7", // Light background
  secondaryDarkGreyHex: "#E8E8E8", // Lighter background
  primaryGreyHex: "#DADADA", // Light grey
  secondaryGreyHex: "#DADADA", // Light grey (same as primary)
  primaryLightGreyHex: "#A0A0A5", // Darker for better contrast
  secondaryLightGreyHex: "#52555A", // Darker for better contrast
  primaryWhiteHex: "#0C0F14", // Inverted (using your original black)
  successGreenHex: "#4BB543", // Keep the same
  primaryBlackRGBA: "rgba(245,245,247,0.5)", // Light version
  secondaryBlackRGBA: "rgba(255,255,255,0.7)", // Light version
};

interface FontFamily {
  poppins_black: string;
  poppins_bold: string;
  poppins_extrabold: string;
  poppins_extralight: string;
  poppins_light: string;
  poppins_medium: string;
  poppins_regular: string;
  poppins_semibold: string;
  poppins_thin: string;
}

export const FONTFAMILY: FontFamily = {
  poppins_black: "Poppins-Black",
  poppins_bold: "Poppins-Bold",
  poppins_extrabold: "Poppins-ExtraBold",
  poppins_extralight: "Poppins-ExtraLight",
  poppins_light: "Poppins-Light",
  poppins_medium: "Poppins-Medium",
  poppins_regular: "Poppins-Regular",
  poppins_semibold: "Poppins-SemiBold",
  poppins_thin: "Poppins-Thin",
};

/* interface FontSize {
  size_8: number;
  size_10: number;
  size_12: number;
  size_14: number;
  size_16: number;
  size_18: number;
  size_20: number;
  size_24: number;
  size_28: number;
  size_30: number;
}

export const FONTSIZE: FontSize = {
  size_8: 8,
  size_10: 10,
  size_12: 12,
  size_14: 14,
  size_16: 16,
  size_18: 18,
  size_20: 20,
  size_24: 24,
  size_28: 28,
  size_30: 30,
};

interface BorderRadius {
  radius_4: number;
  radius_8: number;
  radius_10: number;
  radius_15: number;
  radius_20: number;
  radius_25: number;
}

export const BORDERRADIUS: BorderRadius = {
  radius_4: 4,
  radius_8: 8,
  radius_10: 10,
  radius_15: 15,
  radius_20: 20,
  radius_25: 25,
};
 */
