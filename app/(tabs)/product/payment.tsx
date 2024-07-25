import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import GradientIcon from "@/components/GradientIcon";
import PaymentFooter from "@/components/PaymentFooter";
import PaymentMethod from "@/components/PaymentMethod";
import { COLORS } from "@/theme/theme";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import PopUpAnimation from "@/components/PopUpAnimation";
import { PaymentListType } from "@/constants/types";

const paymentList: PaymentListType[] = [
  {
    name: "Wallet",
    icon: "icon",
    isIcon: true,
  },
  {
    name: "Google Pay",
    icon: require("@/assets/app_images/gpay.png"),
    isIcon: false,
  },
  {
    name: "Apple Pay",
    icon: require("@/assets/app_images/applepay.png"),
    isIcon: false,
  },
  {
    name: "Amazon Pay",
    icon: require("@/assets/app_images/amazonpay.png"),
    isIcon: false,
  },
];

const PaymentScreen = () => {
  const [paymentMode, setPaymentMode] = useState("Credit Card");
  const [showAnimation, setShowAnimation] = useState(false);

  const buttonPressHandler = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 3000);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-black">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {showAnimation && (
        <PopUpAnimation
          style={{ flex: 1 }}
          source={require("@/lottie/successful.json")}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-row justify-between items-center py-4 px-6">
          <TouchableOpacity onPress={() => {}}>
            <GradientIcon
              name="chevron-back"
              color={COLORS.primaryLightGreyHex}
              size={16}
              iconSet="Ionicons"
            />
          </TouchableOpacity>
          <Text className="font-poppins-semibold text-xl text-primary-white">
            Payments
          </Text>
          <View className="h-9 w-9" />
        </View>

        <View className="p-4" style={{ gap: 16 }}>
          <TouchableOpacity
            onPress={() => {
              setPaymentMode("Credit Card");
            }}
          >
            <View
              className={`p-3  rounded-2xl border-2 ${
                paymentMode == "Credit Card"
                  ? "border-primary-orange"
                  : "border-primary-grey"
              }`}
              style={{ gap: 12 }}
            >
              <Text className="font-poppins-semibold text-sm text-primary-white ml-3">
                Credit Card
              </Text>
              <View className="bg-primary-grey rounded-2xl">
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                  className="rounded-2xl  px-4 py-3"
                  style={{ gap: 36 }}
                >
                  <View className="flex-row items-center justify-between">
                    <MaterialCommunityIcons
                      name="integrated-circuit-chip"
                      size={50}
                      color={COLORS.primaryOrangeHex}
                    />
                    <FontAwesome6
                      name="cc-visa"
                      size={50}
                      color={COLORS.primaryWhiteHex}
                    />
                  </View>
                  <View className="flex-row items-center" style={{ gap: 12 }}>
                    <Text className="font-poppins-semibold text-lg text-primary-white tracking-wider">
                      3879
                    </Text>
                    <Text className="font-poppins-semibold text-lg text-primary-white tracking-wider">
                      8923
                    </Text>
                    <Text className="font-poppins-semibold text-lg text-primary-white tracking-wider">
                      6745
                    </Text>
                    <Text className="font-poppins-semibold text-lg text-primary-white tracking-wider">
                      4638
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <View className="items-start">
                      <Text className="font-poppins-regular text-sm text-secondary-light-grey">
                        Card Holder Name
                      </Text>
                      <Text className="font-poppins-medium text-lg text-primary-white">
                        Robert Evans
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="font-poppins-regular text-sm text-secondary-light-grey">
                        Expiry Date
                      </Text>
                      <Text className="font-poppins-medium text-lg text-primary-white">
                        02/30
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          {paymentList.map(({ name, icon, isIcon }: PaymentListType) => (
            <TouchableOpacity
              key={name}
              onPress={() => {
                setPaymentMode(name);
              }}
            >
              <PaymentMethod
                paymentMode={paymentMode}
                name={name}
                icon={icon}
                isIcon={isIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <PaymentFooter
        buttonTitle={`Pay with ${paymentMode}`}
        price={{ price: "20", currency: "$" }}
        buttonPressHandler={buttonPressHandler}
      />
    </SafeAreaView>
  );
};

export default PaymentScreen;
