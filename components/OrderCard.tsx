import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import OrderItemCard from "./OrderItemCard";

interface OrderHistoryCardProps {
  navigationHandler: () => void;
  cart: any;
  totalPrice: number;
  orderDate: string;
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
  navigationHandler,
  cart,
  totalPrice,
  orderDate,
}) => {
  return (
    <View className="space-y-3">
      <View className="flex-row justify-between space-x-5 items-center">
        <View>
          <Text className="font-poppins-semibold text-base text-primary-white">
            Order Time
          </Text>
          <Text className="font-poppins-light text-base text-primary-white">
            {orderDate}
          </Text>
        </View>
        <View className="items-end">
          <Text className="font-poppins-semibold text-base text-primary-white">
            Total Amount
          </Text>
          <Text className="font-poppins-medium text-lg text-primary-orange">
            $ {totalPrice}
          </Text>
        </View>
      </View>
      <View className="space-y-5">
        {cart.map((cartItem: any) => (
          <TouchableOpacity key={cartItem.id} onPress={navigationHandler}>
            <OrderItemCard
              type={cartItem.type}
              name={cartItem.name}
              imagelinkSquare={cartItem.imagelink_square}
              specialIngredient={cartItem.special_ingredient}
              prices={cartItem.prices}
              itemPrice={cartItem.total_price}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default OrderHistoryCard;
