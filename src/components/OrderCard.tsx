import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "nativewind";
import OrderItemCard from "./OrderItemCard";
import { OrderItemType } from "@/constants/types";

type OrderHistoryCardProps = {
  navigationHandler: () => void;
  order_id: number;
  order_items: OrderItemType[];
  total_price: number;
  order_date: string;
};

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
  navigationHandler,
  order_id,
  order_items,
  total_price,
  order_date,
}) => {
  const { colorScheme } = useColorScheme();
  return (
    <View style={{ gap: 12 }}>
      <View
        className="flex-row justify-between items-center"
        style={{ gap: 12 }}
      >
        <View>
          <Text className="font-poppins-semibold text-primary-text">
            Order Time
          </Text>
          <Text className="font-poppins-light text-primary-text">
            {new Date(order_date).toLocaleDateString()}
          </Text>
        </View>
        <View>
          <Text className="font-poppins-semibold text-primary-text text-center">
            Order Id
          </Text>
          <Text className="font-poppins-light text-primary-text">
            # {order_id}
          </Text>
        </View>
        <View className="items-end">
          <Text className="font-poppins-semibold  text-primary-text">
            Total Amount
          </Text>
          <Text className="font-poppins-light text-primary-orange">
            $ {total_price}
          </Text>
        </View>
      </View>
      <View style={{ gap: 20 }}>
        {order_items.map((order_item: any) => (
          <TouchableOpacity key={order_item.id} onPress={navigationHandler}>
            <OrderItemCard
              type={order_item.product.type}
              name={order_item.product.name}
              image_square={order_item.product.image_square}
              special_ingredient={order_item.product.special_ingredient}
              prices={order_item.prices}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default OrderHistoryCard;
