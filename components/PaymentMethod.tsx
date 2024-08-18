import React from "react";
import { useColorScheme } from "nativewind";
import { Text, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

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
  const { colorScheme } = useColorScheme();
  return (
    <View
      className={`border-2 bg-primary-grey rounded-2xl ${
        paymentMode === name ? "border-primary-orange" : "border-primary-grey"
      }`}
    >
      {isIcon ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[
            Colors[colorScheme].secondaryGreyHex,
            Colors[colorScheme].primaryBackgroundHex,
          ]}
          className="flex-row items-center justify-between px-6 py-3 rounded-2xl"
          style={{ gap: 24 }}
        >
          <View className="flex-row items-center" style={{ gap: 24 }}>
            <Text>
              <Ionicons
                name="wallet"
                size={32}
                color={Colors[colorScheme].primaryOrangeHex}
              />
            </Text>
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
          colors={[
            Colors[colorScheme].secondaryGreyHex,
            Colors[colorScheme].primaryBackgroundHex,
          ]}
          className="flex-row items-center px-6 py-3 rounded-2xl"
          style={{ gap: 24 }}
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
