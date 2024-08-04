import { ScrollView, StatusBar, View } from "react-native";
import React from "react";
import { COLORS } from "@/theme/theme";
import HeaderBar from "@/components/HeaderBar";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderData from "@/data/OrderData";
import OrderHistoryCard from "@/components/OrderCard";
import OrderStatus from "@/components/OrderStatus";
import { useOrder } from "@/api/orders/useOrder";
import Loader from "@/components/loader/Loader";
import NotFound from "@/components/loader/NotFound";

const OrderDetailsScreen = () => {
  const { order, isLoading } = useOrder();

  if (isLoading) return <Loader />;
  if (!order)
    return (
      <NotFound
        message="Order not found!"
        redirectTo="/(tabs)/order"
        label="Go Back"
        goBack
      />
    );
  return (
    <SafeAreaView className="flex-1 bg-primary-black">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderBar title="Order History" />
        <View className="flex-1">
          <OrderStatus currentStatus={order.status} />
          <View className="px-5" style={{ gap: 32 }}>
            <OrderHistoryCard
              key={2}
              navigationHandler={() => {}}
              order_id={order.id}
              order_items={order.order_items}
              total_price={order.total_price}
              order_date={order.order_date}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;
