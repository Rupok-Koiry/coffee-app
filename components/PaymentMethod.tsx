import { Text, View, Image } from "react-native";
import React from "react";
import { COLORS } from "@/theme/theme";
import { LinearGradient } from "expo-linear-gradient";

type PaymentMethodProps = {
  paymentMode: string;
  name: string;
  icon: any;
  isIcon: boolean;
};

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentMode,
  name,
  icon,
  isIcon,
}) => {
  return (
    <View
      className={`border-3 bg-primary-grey rounded-2xl ${
        paymentMode == name ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex
      }`}
    >
      {isIcon ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          className="flex-row items-center justify-between px-6 py-3 gap-6 rounded-2xl"
        >
          <View className="flex-row items-center gap-6">
            {/* <CustomIcon
              name={"wallet"}
              color={COLORS.primaryOrangeHex}
              size={FONTSIZE.size_30}
            /> */}
            <Text className="font-poppins-semibold text-base text-primary-white">
              {name}
            </Text>
          </View>
          <Text className="font-poppins-regular text-base text-secondary-light-grey">
            $ 100.50
          </Text>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          className="flex-row items-center px-6 py-3 gap-6 rounded-2xl"
        >
          <Image source={icon} className="h-8 w-8" />
          <Text className="font-poppins-semibold text-base text-primary-white">
            {name}
          </Text>
        </LinearGradient>
      )}
    </View>
  );
};

export default PaymentMethod;
