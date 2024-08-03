import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
  return (
    <View className="space-y-3">
      <View className="flex-row justify-between space-x-5 items-center">
        <View>
          <Text className="font-poppins-semibold text-primary-white">
            Order Time
          </Text>
          <Text className="font-poppins-light text-primary-white">
            {new Date(order_date).toLocaleDateString()}
          </Text>
        </View>
        <View>
          <Text className="font-poppins-semibold text-primary-white text-center">
            Order Id
          </Text>
          <Text className="font-poppins-light text-primary-white">
            # {order_id}
          </Text>
        </View>
        <View className="items-end">
          <Text className="font-poppins-semibold  text-primary-white">
            Total Amount
          </Text>
          <Text className="font-poppins-light text-primary-orange">
            $ {total_price}
          </Text>
        </View>
      </View>
      <View className="space-y-5">
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
