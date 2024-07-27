import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import GradientIcon from "./GradientIcon";
import { COLORS } from "@/theme/theme";
type OrderStatusProps = {
  currentStatus: string;
};

const OrderStatus = ({ currentStatus }: OrderStatusProps) => {
  const statuses = [
    {
      title: "Order Placed",
      description:
        "Your order has been successfully placed and is being processed.",
      icon: "cart",
      status: "placed",
    },
    {
      title: "Order Confirmed",
      description:
        "Your order has been confirmed and will be prepared shortly.",
      icon: "checkmark-circle",
      status: "confirmed",
    },
    {
      title: "On The Way",
      description: "Your order is on its way! It will reach you soon.",
      icon: "bicycle",
      status: "onTheWay",
    },
    {
      title: "Order Delivered",
      description: "Your order has been delivered. Enjoy your purchase!",
      icon: "home",
      status: "delivered",
    },
  ];

  const getColor = (status: string) => {
    const statusOrder = statuses.map((s) => s.status);
    const currentIndex = statusOrder.indexOf(currentStatus);
    const statusIndex = statusOrder.indexOf(status);

    return statusIndex <= currentIndex
      ? COLORS.primaryOrangeHex
      : COLORS.primaryLightGreyHex;
  };

  return (
    <View className="flex-col p-5">
      {statuses.map((status, index) => (
        <View key={status.status} className="flex-row items-start mb-5">
          <View className="items-center mr-3">
            <GradientIcon
              name={status.icon}
              size={24}
              color={getColor(status.status)}
              iconSet="Ionicons"
            />
            {index < statuses.length - 1 && (
              <View
                className="w-0.5 h-8 rounded-sm"
                style={{
                  backgroundColor: getColor(statuses[index + 1].status),
                }}
              />
            )}
          </View>
          <View className="flex-1">
            <Text
              className="text-base font-poppins-semibold"
              style={{ color: getColor(status.status) }}
            >
              {status.title}
            </Text>
            <Text className="text-xs text-secondary-light-grey">
              {status.description}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default OrderStatus;
