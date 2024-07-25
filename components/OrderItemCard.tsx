import { Text, View, Image, ImageProps } from "react-native";
import React from "react";
import { COLORS } from "../theme/theme";
import { LinearGradient } from "expo-linear-gradient";

interface OrderItemCardProps {
  type: string;
  name: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  prices: any;
  ItemPrice: string;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({
  type,
  name,
  imagelink_square,
  special_ingredient,
  prices,
  ItemPrice,
}) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      className="p-5 rounded-lg"
      style={{ gap: 20 }}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row  items-center" style={{ gap: 20 }}>
          <Image source={imagelink_square} className="h-24 w-24 rounded-lg" />
          <View>
            <Text className="font-poppins_medium text-lg text-white">
              {name}
            </Text>
            <Text className="font-poppins_regular text-sm text-gray-400">
              {special_ingredient}
            </Text>
          </View>
        </View>
        <View>
          <Text className="font-poppins_semibold text-xl text-orange-500">
            $ <Text className="text-white">{ItemPrice}</Text>
          </Text>
        </View>
      </View>
      {prices.map((data: any, index: any) => (
        <View
          key={index.toString()}
          className="flex-1 flex-row justify-between items-center"
        >
          <View className="flex-1 flex-row justify-between items-center">
            <View className="bg-black h-11 flex-1 rounded-l-lg justify-center items-center border-r border-gray-500">
              <Text
                className={`font-poppins_medium text-gray-400 ${
                  type == "Bean" ? "text-xs" : "text-base"
                }`}
              >
                {data.size}
              </Text>
            </View>
            <View className="bg-black h-11 flex-1 rounded-r-lg justify-center items-center border-l border-gray-500">
              <Text className="font-poppins_semibold text-lg text-orange-500">
                {data.currency}
                <Text className="text-white"> {data.price}</Text>
              </Text>
            </View>
          </View>

          <View className="flex-1 flex-row justify-between items-center">
            <Text className="flex-1 text-center font-poppins_semibold text-lg text-orange-500">
              X <Text className="text-white">{data.quantity}</Text>
            </Text>
            <Text className="flex-1 text-center font-poppins_semibold text-lg text-orange-500">
              $ {(data.quantity * data.price).toFixed(2).toString()}
            </Text>
          </View>
        </View>
      ))}
    </LinearGradient>
  );
};

export default OrderItemCard;
