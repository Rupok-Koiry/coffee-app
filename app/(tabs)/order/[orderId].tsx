import { ScrollView, StatusBar, View } from "react-native";
import React from "react";
import { COLORS } from "@/theme/theme";
import HeaderBar from "@/components/HeaderBar";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderData from "@/data/OrderData";
import OrderHistoryCard from "@/components/OrderCard";

const OrderScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary-black">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderBar title="Order History" />
        <View className="flex-1 justify-between">
          <View className="flex-1">
            <View className="px-5" style={{ gap: 32 }}>
              <OrderHistoryCard
                key={OrderData[0].id}
                navigationHandler={() => {}}
                cart={OrderData[0].cart}
                totalPrice={OrderData[0].total_price}
                orderDate={OrderData[0].order_date}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderScreen;
