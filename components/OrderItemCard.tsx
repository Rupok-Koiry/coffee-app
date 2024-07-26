import { Text, View, Image, ImageProps } from "react-native";
import React from "react";
import { COLORS } from "../theme/theme";
import { LinearGradient } from "expo-linear-gradient";

interface OrderItemCardProps {
  type: string;
  name: string;
  imagelinkSquare: ImageProps;
  specialIngredient: string;
  prices: any;
  itemPrice: string;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({
  type,
  name,
  imagelinkSquare,
  specialIngredient,
  prices,
  itemPrice,
}) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      className="p-3 rounded-2xl"
      style={{ gap: 20 }}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row  items-center" style={{ gap: 16 }}>
          <Image source={imagelinkSquare} className="h-24 w-24 rounded-xl" />
          <View>
            <Text className="font-poppins-medium text-lg text-primary-white">
              {name}
            </Text>
            <Text className="font-poppins-regular text-xs text-secondary-light-grey">
              {specialIngredient}
            </Text>
          </View>
        </View>
        <View>
          <Text className="font-poppins-semibold text-lg text-primary-orange">
            $<Text className="text-primary-white">{itemPrice}</Text>
          </Text>
        </View>
      </View>
      {prices.map((price: any, index: any) => (
        <View
          key={index.toString()}
          className="flex-1 flex-row justify-between items-center"
        >
          <View className="flex-1 flex-row justify-between items-center">
            <View className="bg-black h-10 flex-1 rounded-l-lg justify-center items-center border-r border-primary-grey">
              <Text
                className={`font-poppins-medium text-secondary-light-grey ${
                  type == "Bean" ? "text-sm" : "text-base"
                }`}
              >
                {price.size}
              </Text>
            </View>
            <View className="bg-black h-10 flex-1 rounded-r-lg justify-center items-center border-l border-primary-grey">
              <Text className="font-poppins-semibold text-base text-primary-orange">
                {price.currency}
                <Text className="text-primary-white"> {price.price}</Text>
              </Text>
            </View>
          </View>

          <View className="flex-1 flex-row justify-between items-center">
            <Text className="flex-1 text-center font-poppins-semibold text-base text-primary-orange">
              X <Text className="text-primary-white">{price.quantity}</Text>
            </Text>
            <Text className="flex-1 text-center font-poppins-semibold text-base text-primary-orange">
              $ {(price.quantity * price.price).toFixed(2).toString()}
            </Text>
          </View>
        </View>
      ))}
    </LinearGradient>
  );
};

export default OrderItemCard;
