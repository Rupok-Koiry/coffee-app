import { COLORS } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View, ImageProps, Image, TouchableOpacity } from "react-native";

interface CartItemProps {
  id: string;
  name: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  roasted: string;
  prices: any;
  type: string;
  incrementCartItemQuantityHandler: any;
  decrementCartItemQuantityHandler: any;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  imagelink_square,
  special_ingredient,
  roasted,
  prices,
  type,
  incrementCartItemQuantityHandler,
  decrementCartItemQuantityHandler,
}) => {
  return (
    <View>
      {prices.length > 1 ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          className="flex-1 p-3 rounded-2xl"
        >
          <View className="flex-row flex-1">
            <Image source={imagelink_square} className="w-32 h-32 rounded-xl" />
            <View className="flex-1 py-1 justify-between ml-5">
              <View>
                <Text className="font-poppins-medium text-lg text-primary-white">
                  {name}
                </Text>
                <Text className="font-poppins-regular text-xs text-secondary-light-grey">
                  {special_ingredient}
                </Text>
              </View>
              <View className="h-12 w-[132px] rounded-xl justify-center items-center bg-primary-dark-grey">
                <Text className="font-poppins-regular text-xs text-primary-white">
                  {roasted}
                </Text>
              </View>
            </View>
          </View>
          <View className="mt-3 space-y-3">
            {prices.map((price: any, index: any) => (
              <View
                key={index.toString()}
                className="flex-1 items-center flex-row justify-center space-x-5"
              >
                <View className="flex-1 items-center flex-row justify-between">
                  <View className="bg-primary-black h-10 w-16 rounded-lg justify-center items-center">
                    <Text
                      className={`font-poppins-medium ${
                        type === "Bean"
                          ? "text-sm text-secondary-light-grey"
                          : "text-base text-primary-white"
                      }`}
                    >
                      {price.size}
                    </Text>
                  </View>
                  <Text className="font-poppins-semibold text-base text-primary-orange">
                    {price.currency}
                    <Text className="text-primary-white">{price.price}</Text>
                  </Text>
                </View>
                <View className="flex-1 items-center flex-row justify-between">
                  <TouchableOpacity
                    className="bg-primary-orange p-2 rounded-lg"
                    onPress={() => {
                      decrementCartItemQuantityHandler(id, price.size);
                    }}
                  >
                    <Ionicons
                      name="remove"
                      color={COLORS.primaryWhiteHex}
                      size={14}
                    />
                  </TouchableOpacity>
                  <View className="bg-primary-black w-14 rounded-lg border border-primary-orange items-center py-0.5">
                    <Text className="font-poppins-semibold text-base text-primary-white">
                      {price.quantity}
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="bg-primary-orange p-2 rounded-lg"
                    onPress={() => {
                      incrementCartItemQuantityHandler(id, price.size);
                    }}
                  >
                    <Ionicons
                      name="add"
                      color={COLORS.primaryWhiteHex}
                      size={14}
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
          className="flex-row flex-1 items-center p-3 rounded-2xl"
        >
          <View>
            <Image source={imagelink_square} className="w-36 h-36 rounded-xl" />
          </View>
          <View className="flex-1 self-stretch justify-around ml-5">
            <View>
              <Text className="font-poppins-medium text-lg text-primary-white">
                {name}
              </Text>
              <Text className="font-poppins-regular text-xs text-secondary-light-grey">
                {special_ingredient}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-2">
              <View className="bg-primary-black h-10 w-16 rounded-lg justify-center items-center">
                <Text
                  className={`font-poppins-medium ${
                    type === "Bean"
                      ? "text-sm text-secondary-light-grey"
                      : "text-base text-primary-white"
                  }`}
                >
                  {prices[0].size}
                </Text>
              </View>
              <Text className="text-base text-primary-orange font-semibold">
                {prices[0].currency}
                <Text className="text-primary-white">{prices[0].price}</Text>
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="bg-primary-orange p-2 rounded-lg"
                onPress={() => {
                  decrementCartItemQuantityHandler(id, prices[0].size);
                }}
              >
                <Ionicons
                  name="remove"
                  size={14}
                  color={COLORS.primaryWhiteHex}
                />
              </TouchableOpacity>
              <View className="bg-primary-black w-14 rounded-lg border border-primary-orange items-center py-0.5">
                <Text className="font-poppins-semibold text-base text-primary-white">
                  {prices[0].quantity}
                </Text>
              </View>
              <TouchableOpacity
                className="bg-primary-orange p-2 rounded-lg"
                onPress={() => {
                  incrementCartItemQuantityHandler(id, prices[0].size);
                }}
              >
                <Ionicons name="add" color={COLORS.primaryWhiteHex} size={14} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

export default CartItem;
