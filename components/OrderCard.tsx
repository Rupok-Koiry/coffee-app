import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import OrderItemCard from "./OrderItemCard";

interface OrderHistoryCardProps {
  navigationHandler: any;
  cart: any;
  totalPrice: string;
  OrderDate: string;
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
  navigationHandler,
  cart,
  totalPrice,
  OrderDate,
}) => {
  return (
    <View className="space-y-3">
      <View className="flex-row justify-between space-x-5 items-center">
        <View>
          <Text className="font-poppins-semibold text-base text-primary-white">
            Order Time
          </Text>
          <Text className="font-poppins-light text-base text-primary-white">
            {OrderDate}
          </Text>
        </View>
        <View className="items-end">
          <Text className="font-poppins_semibold text-base text-primary-white">
            Total Amount
          </Text>
          <Text className="font-poppins_medium text-lg text-primary-orange">
            $ {totalPrice}
          </Text>
        </View>
      </View>
      <View className="space-y-5">
        {cart.map((data: any, index: any) => (
          <TouchableOpacity
            key={index.toString() + data.id}
            onPress={() => {
              navigationHandler({
                index: data.index,
                id: data.id,
                type: data.type,
              });
            }}
          >
            <OrderItemCard
              type={data.type}
              name={data.name}
              imagelink_square={data.imagelink_square}
              special_ingredient={data.special_ingredient}
              prices={data.prices}
              ItemPrice={data.ItemPrice}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default OrderHistoryCard;
