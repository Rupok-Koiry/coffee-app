import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/theme/theme";
import PopUpAnimation from "@/components/PopUpAnimation";
import HeaderBar from "@/components/HeaderBar";
import EmptyListAnimation from "@/components/EmptyListAnimation";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderData from "@/data/OrderData";
import OrderHistoryCard from "@/components/OrderCard";

const OrderScreen = () => {
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
          style={{ height: 300 }}
          source={require("@/lottie/download.json")}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 justify-between">
          <View className="flex-1">
            <HeaderBar title="Order History" />

            {OrderData.length == 0 ? (
              <EmptyListAnimation title={"No Order History"} />
            ) : (
              <View className="px-5" style={{ gap: 32 }}>
                {OrderData.map((order) => (
                  <OrderHistoryCard
                    key={order.id}
                    navigationHandler={() => {}}
                    cart={order.cart}
                    totalPrice={order.total_price}
                    orderDate={order.order_date}
                  />
                ))}
              </View>
            )}
          </View>
          {OrderData.length > 0 && (
            <TouchableOpacity
              className="m-5 bg-primary-orange justify-center items-center h-14 rounded-2xl"
              onPress={() => {
                buttonPressHandler();
              }}
            >
              <Text className="font-poppins-semibold text-lg text-primary-white">
                Download
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderScreen;
