import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "@/theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "@/components/HeaderBar";
import Button from "@/components/Button";
import OrderHistoryCard from "@/components/OrderCard";
import OrderData from "@/data/OrderData";
import OrderStatus from "@/components/OrderStatus";

const OrderTrackingScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary-black">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderBar title="Track Order" />
        <View className="p-5">
          <Text className="font-poppins-semibold text-3xl text-primary-white mb-5">
            Track Your Order
          </Text>
          <TextInput
            placeholder="Enter your order id"
            placeholderTextColor={COLORS.primaryLightGreyHex}
            className=" rounded-xl flex-1 font-poppins-medium text-base text-primary-white p-3 bg-primary-dark-grey mb-5 border border-primary-grey"
            cursorColor={COLORS.primaryOrangeHex}
          />
          <Button>Track Order</Button>
        </View>
        <OrderStatus currentStatus="onTheWay" />

        <View className="px-5">
          <OrderHistoryCard
            key={OrderData[0].id}
            navigationHandler={() => {}}
            cart={OrderData[0].cart}
            totalPrice={OrderData[0].total_price}
            orderDate={OrderData[0].order_date}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderTrackingScreen;
