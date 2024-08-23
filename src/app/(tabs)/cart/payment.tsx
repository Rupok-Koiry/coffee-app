import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import PaymentFooter from "@/components/PaymentFooter";
import PaymentMethod from "@/components/PaymentMethod";
import { Colors } from "@/constants/Colors";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import PopUpAnimation from "@/components/PopUpAnimation";
import { PaymentListType } from "@/constants/types";
import HeaderBar from "@/components/HeaderBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/features/store";
import { clearCart } from "@/features/cartSlice";
import { useCreateOrderWithItems } from "@/hooks/orders/useCreateOrderWithItems";
import { initializePaymentSheet, openPaymentSheet } from "@/services/apiStripe";
import { useUser } from "@/hooks/auth/useUser";
import SignInModal from "@/components/modals/SignInModal";
import { useColorScheme } from "nativewind";
import { useRouter } from "expo-router";

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
  const { colorScheme } = useColorScheme();

  const [paymentMode, setPaymentMode] = useState("Credit Card");
  const [showAnimation, setShowAnimation] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const { createOrderWithItems } = useCreateOrderWithItems();
  const { user } = useUser();

  const handleButtonPress = async () => {
    setIsLoading(true);
    if (!user) {
      setModalVisible(true);
      setIsLoading(false);
      return;
    }
    const totalPriceInCents = Math.floor(cart.total_price * 100);
    await initializePaymentSheet(totalPriceInCents);
    const payed = await openPaymentSheet();

    if (!payed) {
      setIsLoading(false);
      return;
    }

    createOrderWithItems(
      {
        cart,
        userId: user?.id,
      },
      {
        onSuccess: () => {
          dispatch(clearCart());
          setIsLoading(false);
          setShowAnimation(true);
          setTimeout(() => {
            setShowAnimation(false);
            router.push("/(tabs)/order/listing/active");
          }, 3000);
        },
      }
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme].primaryBackgroundHex,
      }}
    >
      <StatusBar backgroundColor={Colors[colorScheme].primaryBackgroundHex} />

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
        <HeaderBar title="Payments" />
        <View className="p-5" style={{ gap: 16 }}>
          <TouchableOpacity
            onPress={() => {
              setPaymentMode("Credit Card");
            }}
          >
            <View
              className={`p-3 rounded-2xl border-2 ${
                paymentMode == "Credit Card"
                  ? "border-primary-orange"
                  : "border-primary-grey"
              }`}
              style={{ gap: 12 }}
            >
              <Text className="font-poppins-semibold text-sm text-primary-text ml-3">
                Credit Card
              </Text>
              <View className="bg-primary-grey rounded-2xl">
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={[
                    Colors[colorScheme].secondaryGreyHex,
                    Colors[colorScheme].primaryBackgroundHex,
                  ]}
                  className="px-4 py-3"
                  style={{ gap: 36, borderRadius: 16 }}
                >
                  <View className="flex-row items-center justify-between">
                    <MaterialCommunityIcons
                      name="integrated-circuit-chip"
                      size={42}
                      color={Colors[colorScheme].primaryOrangeHex}
                    />
                    <FontAwesome6
                      name="cc-visa"
                      size={42}
                      color={Colors[colorScheme].primaryTextHex}
                    />
                  </View>
                  <View className="flex-row items-center" style={{ gap: 12 }}>
                    <Text className="font-poppins-semibold text-base text-primary-text tracking-widest">
                      1234
                    </Text>
                    <Text className="font-poppins-semibold text-base text-primary-text tracking-widest">
                      5678
                    </Text>
                    <Text className="font-poppins-semibold text-base text-primary-text tracking-widest">
                      9012
                    </Text>
                    <Text className="font-poppins-semibold text-base text-primary-text tracking-widest">
                      3456
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <View className="items-start">
                      <Text className="font-poppins-regular text-xs text-secondary-text mb-0.5">
                        Card Holder Name
                      </Text>
                      <Text className="font-poppins-medium text-base text-primary-text">
                        John Doe
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="font-poppins-regular text-xs text-secondary-text mb-0.5">
                        Expiry Date
                      </Text>
                      <Text className="font-poppins-medium text-base text-primary-text">
                        06/12
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

        <PaymentFooter
          buttonTitle={`Pay with ${paymentMode}`}
          price={cart.total_price}
          buttonPressHandler={handleButtonPress}
          isLoading={isLoading}
        />

        <SignInModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title="You need to be signed in to make a payment."
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentScreen;
