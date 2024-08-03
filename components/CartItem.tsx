import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SUPABASE_URL } from "@/services/supabase";
import { COLORS } from "@/theme/theme";
import { Tables } from "@/constants/database.types";
import { CartItemType, PricesType } from "@/constants/types";

type CartItemProps = {
  item: CartItemType;
  incrementQuantity: (size: string, quantity: number) => void;
  decrementQuantity: (size: string, quantity: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  incrementQuantity,
  decrementQuantity,
}) => {
  const { product, prices } = item;

  return (
    <View>
      {prices.length > 1 ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          className="p-3 rounded-2xl"
          style={{ flex: 1 }}
        >
          <View className="flex-row flex-1">
            <Image
              source={{
                uri: `${SUPABASE_URL}/storage/v1/object/public/product-images/square/${product.image_square}`,
              }}
              className="w-32 h-32 rounded-xl"
            />
            <View className="flex-1 py-1 justify-between ml-5">
              <View>
                <Text className="font-poppins-medium text-lg text-primary-white">
                  {product.name}
                </Text>
                <Text className="font-poppins-regular text-xs text-secondary-light-grey">
                  {product.special_ingredient}
                </Text>
              </View>
              <View className="h-12 w-[132px] rounded-lg justify-center items-center bg-primary-dark-grey">
                <Text className="font-poppins-regular text-xs text-primary-white">
                  {product.roasted}
                </Text>
              </View>
            </View>
          </View>
          <View className="mt-3 space-y-3">
            {prices.map((price, index) => (
              <View
                key={index.toString()}
                className="flex-1 items-center flex-row justify-center space-x-5"
              >
                <View className="flex-1 items-center flex-row justify-between">
                  <View className="bg-primary-black h-10 w-20 rounded-lg justify-center items-center">
                    <Text
                      className={`font-poppins-medium ${
                        product.type === "BEAN"
                          ? "text-sm text-secondary-light-grey"
                          : "text-base text-primary-white"
                      }`}
                    >
                      {price.size}
                    </Text>
                  </View>
                  <Text className="font-poppins-semibold text-base text-primary-orange">
                    $<Text className="text-primary-white">{price.price}</Text>
                  </Text>
                </View>
                <View className="flex-1 items-center flex-row justify-between">
                  <TouchableOpacity
                    className="bg-primary-orange p-2 rounded-lg"
                    onPress={() =>
                      decrementQuantity(price.size, price.quantity)
                    }
                  >
                    <Ionicons
                      name="remove"
                      color={COLORS.primaryWhiteHex}
                      size={16}
                    />
                  </TouchableOpacity>
                  <View className="bg-primary-black w-14 rounded-lg border border-primary-orange items-center py-1">
                    <Text className="font-poppins-semibold text-base text-primary-white">
                      {price.quantity}
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="bg-primary-orange p-2 rounded-lg"
                    onPress={() =>
                      incrementQuantity(price.size, price.quantity)
                    }
                  >
                    <Ionicons
                      name="add"
                      color={COLORS.primaryWhiteHex}
                      size={16}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          className="flex-row items-center p-3 rounded-2xl"
          style={{ flex: 1 }}
        >
          <View>
            <Image
              source={{
                uri: `${SUPABASE_URL}/storage/v1/object/public/product-images/square/${product.image_square}`,
              }}
              className="w-36 h-36 rounded-xl"
            />
          </View>
          <View className="flex-1 self-stretch justify-around ml-5">
            <View>
              <Text className="font-poppins-medium text-lg text-primary-white">
                {product.name}
              </Text>
              <Text className="font-poppins-regular text-xs text-secondary-light-grey">
                {product.special_ingredient}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-2">
              <View className="bg-primary-black h-10 w-16 rounded-lg justify-center items-center">
                <Text
                  className={`font-poppins-medium ${
                    product.type === "BEAN"
                      ? "text-sm text-secondary-light-grey"
                      : "text-base text-primary-white"
                  }`}
                >
                  {prices[0].size}
                </Text>
              </View>
              <Text className="text-base text-primary-orange font-poppins-semibold">
                $<Text className="text-primary-white">{prices[0].price}</Text>
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="bg-primary-orange p-2 rounded-lg"
                onPress={() =>
                  decrementQuantity(prices[0].size, prices[0].quantity)
                }
              >
                <Ionicons
                  name="remove"
                  size={16}
                  color={COLORS.primaryWhiteHex}
                />
              </TouchableOpacity>
              <View className="bg-primary-black w-14 rounded-lg border border-primary-orange items-center py-1">
                <Text className="font-poppins-semibold text-base text-primary-white">
                  {prices[0].quantity}
                </Text>
              </View>
              <TouchableOpacity
                className="bg-primary-orange p-2 rounded-lg"
                onPress={() =>
                  incrementQuantity(prices[0].size, prices[0].quantity)
                }
              >
                <Ionicons name="add" color={COLORS.primaryWhiteHex} size={16} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

export default CartItem;
