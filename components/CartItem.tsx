import { COLORS } from "@/theme/theme";
import { AntDesign, Ionicons } from "@expo/vector-icons";
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
      {prices.length != 1 ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          className="flex-1 p-3 gap-3 rounded-2xl"
        >
          <View className="flex-row gap-3 flex-1">
            <Image source={imagelink_square} className="w-32 h-32 rounded-xl" />
            <View className="flex-1 py-1 justify-between">
              <View>
                <Text className="font-poppins-medium text-lg text-primary-white">
                  {name}
                </Text>
                <Text className="font-poppins-regular text-xs text-secondary-light-grey">
                  {special_ingredient}
                </Text>
              </View>
              <View className="h-12 w-36 rounded-xl justify-center items-center bg-primary-dark-grey">
                <Text className="font-poppins-regular text-xs text-primary-white">
                  {roasted}
                </Text>
              </View>
            </View>
          </View>
          {prices.map((data: any, index: any) => (
            <View
              key={index.toString()}
              className="flex-1 items-center gap-5 flex-row justify-center"
            >
              <View className="flex-1 items-center flex-row justify-between">
                <Text className="font-poppins-medium text-secondary-light-grey">
                  {data.size}
                </Text>
                <Text className="font-poppins-semibold text-lg text-primary-orange">
                  {data.currency} {data.price}
                </Text>
              </View>
              <View className="flex-1 items-center flex-row justify-between">
                <TouchableOpacity
                  className="bg-primary-orange p-3 rounded-lg"
                  onPress={() => {
                    decrementCartItemQuantityHandler(id, data.size);
                  }}
                >
                  <Ionicons
                    name="remove"
                    color={COLORS.primaryWhiteHex}
                    size={10}
                  />
                </TouchableOpacity>
                <View className="bg-primary-orange w-20 rounded-lg border-2 border-primary-orange items-center py-1">
                  <Text className="font-poppins-semibold text-base text-primary-white">
                    {data.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  className="bg-primary-orange p-3 rounded-lg"
                  onPress={() => {
                    incrementCartItemQuantityHandler(id, data.size);
                  }}
                >
                  <Ionicons
                    name="add"
                    color={COLORS.primaryWhiteHex}
                    size={10}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          className="flex-row items-center p-3 gap-3 rounded-2xl"
        >
          <View>
            <Image source={imagelink_square} className="w-36 h-36 rounded-xl" />
          </View>
          <View className="flex-1 self-stretch justify-around">
            <View>
              <Text className="font-poppins-medium text-lg text-primary-white">
                {name}
              </Text>
              <Text className="font-poppins-regular text-xs text-secondary-light-grey">
                {special_ingredient}
              </Text>
            </View>
            <View className="flex-row justify-evenly items-center">
              <View className="bg-primary-black h-10 w-24 rounded-lg justify-center items-center">
                <Text className="font-poppins-medium text-secondary-light-grey">
                  {prices[0].size}
                </Text>
              </View>
              <Text className="text-lg text-primary-orange font-semibold">
                {prices[0].currency} {prices[0].price}
              </Text>
            </View>
            <View className="flex-row justify-evenly items-center">
              <TouchableOpacity
                className="bg-primary-orange p-3 rounded-lg"
                onPress={() => {
                  decrementCartItemQuantityHandler(id, prices[0].size);
                }}
              >
                <AntDesign
                  name="minus"
                  size={10}
                  color={COLORS.primaryWhiteHex}
                />
              </TouchableOpacity>
              <View className="bg-primary-orange w-20 rounded-lg border-2 border-primary-orange items-center py-1">
                <Text className="font-poppins-semibold text-base text-primary-white">
                  {prices[0].quantity}
                </Text>
              </View>
              <TouchableOpacity
                className="bg-primary-orange p-3 rounded-lg"
                onPress={() => {
                  incrementCartItemQuantityHandler(id, prices[0].size);
                }}
              >
                <Ionicons name="add" color={COLORS.primaryWhiteHex} size={10} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

export default CartItem;
