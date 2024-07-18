import GradientIcon from "@/components/GradientIcon";
import PaymentFooter from "@/components/PaymentFooter";
import { COLORS } from "@/theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const PaymentList = [
  {
    name: "Wallet",
    icon: "icon",
    isIcon: true,
  },
  {
    name: "Google Pay",
    icon: require("../assets/app_images/gpay.png"),
    isIcon: false,
  },
  {
    name: "Apple Pay",
    icon: require("../assets/app_images/applepay.png"),
    isIcon: false,
  },
  {
    name: "Amazon Pay",
    icon: require("../assets/app_images/amazonpay.png"),
    isIcon: false,
  },
];

const PaymentScreen = ({ navigation, route }: any) => {
  const [paymentMode, setPaymentMode] = useState("Credit Card");
  const [showAnimation, setShowAnimation] = useState(false);

  const buttonPressHandler = () => {
    setShowAnimation(true);
  };

  return (
    <View className="flex-1 bg-primary-black">
      {/* {showAnimation && (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require("../lottie/successful.json")}
        />
      )} */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={styles.ScrollViewFlex}
      >
        <View className="flex-row justify-between items-center py-4 px-6">
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
          >
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

        <View className="p-4 gap-4">
          <TouchableOpacity
            onPress={() => {
              setPaymentMode("Credit Card");
            }}
          >
            <View
              className={`p-3 gap-3 rounded-2xl border-2 
                ${
                  paymentMode == "Credit Card"
                    ? "border-primary-orange"
                    : "border-primary-grey"
                }
                `}
            >
              <Text className="font-poppins-semibold text-sm text-primary-white ml-3">
                Credit Card
              </Text>
              <View className="bg-primary-grey rounded-2xl">
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                  className="rounded-2xl gap-9 px-4 py-3"
                >
                  <View className="flex-row items-center justify-between">
                    {/* <CustomIcon
                      name="chip"
                      size={40}
                      color={COLORS.primaryOrangeHex}
                    />
                    <CustomIcon
                      name="visa"
                      size={60}
                      color={COLORS.primaryWhiteHex}
                    /> */}
                  </View>
                  <View className="flex-row items-center gap-3">
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
          {PaymentList.map((data: any) => (
            <TouchableOpacity
              key={data.name}
              onPress={() => {
                setPaymentMode(data.name);
              }}
            >
              {/* <PaymentMethod
                paymentMode={paymentMode}
                name={data.name}
                icon={data.icon}
                isIcon={data.isIcon}
              /> */}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <PaymentFooter
        buttonTitle={`Pay with ${paymentMode}`}
        price={{ price: "20", currency: "$" }}
        buttonPressHandler={buttonPressHandler}
      />
    </View>
  );
};

export default PaymentScreen;
