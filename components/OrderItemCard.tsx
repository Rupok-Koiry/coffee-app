import { Text, View, Image } from "react-native";
import React from "react";
import { COLORS } from "../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import { SUPABASE_URL } from "@/services/supabase";
import { PriceType } from "@/constants/types";

type OrderItemCardProps = {
  type: string;
  name: string;
  image_square: string;
  special_ingredient: string;
  prices: PriceType[];
};

const OrderItemCard: React.FC<OrderItemCardProps> = ({
  type,
  name,
  image_square,
  special_ingredient,
  prices,
}) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      className="p-3 rounded-2xl"
      style={{ gap: 20, flex: 1 }}
    >
      <View className="flex-row  items-center" style={{ gap: 16 }}>
        <Image
          source={{
            uri: `${SUPABASE_URL}/storage/v1/object/public/product-images/square/${image_square}`,
          }}
          className="h-24 w-24 rounded-xl"
        />
        <View className="space-y-2">
          <View>
            <Text className="font-poppins-medium text-lg text-primary-white">
              {name}
            </Text>
            <Text className="font-poppins-regular text-xs text-secondary-light-grey">
              {special_ingredient}
            </Text>
          </View>
          <View>
            <Text className="font-poppins-semibold text-lg text-primary-orange">
              $
              <Text className="text-primary-white">
                {prices
                  .reduce((acc, price) => acc + price.quantity * price.price, 0)
                  .toFixed(2)}
              </Text>
            </Text>
          </View>
        </View>
      </View>
      {prices.map((price, index) => (
        <View
          key={index.toString()}
          className="flex-1 flex-row justify-between items-center"
        >
          <View className="flex-1 flex-row justify-between items-center">
            <View className="bg-black h-10 flex-1 rounded-l-lg justify-center items-center border-r border-primary-grey">
              <Text
                className={`font-poppins-medium  ${
                  type == "BEAN"
                    ? "text-sm text-secondary-light-grey"
                    : "text-base text-white"
                }`}
              >
                {price.size}
              </Text>
            </View>
            <View className="bg-black h-10 flex-1 rounded-r-lg justify-center items-center border-l border-primary-grey">
              <Text className="font-poppins-semibold text-base text-primary-orange">
                $<Text className="text-primary-white">{price.price}</Text>
              </Text>
            </View>
          </View>

          <View className="flex-1 flex-row justify-between items-center">
            <Text className="flex-1 text-center font-poppins-semibold text-base text-primary-orange">
              X <Text className="text-primary-white">{price.quantity}</Text>
            </Text>
            <Text className="flex-1 text-center font-poppins-semibold text-base text-primary-orange">
              $ {price.quantity * price.price}
            </Text>
          </View>
        </View>
      ))}
    </LinearGradient>
  );
};

export default OrderItemCard;
