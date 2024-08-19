import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
import { SUPABASE_URL } from "@/services/supabase";
import BgIcon from "@/components/BgIcon";
import { Tables } from "@/constants/types";

type SearchCardProps = {
  product: Tables<"products"> & {
    prices: Tables<"prices">[];
  };
};

const SearchCard = ({ product }: SearchCardProps) => {
  const { colorScheme } = useColorScheme();
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[
        Colors[colorScheme].secondaryGreyHex,
        Colors[colorScheme].primaryBackgroundHex,
      ]}
      className="p-3 rounded-2xl"
      style={{ flex: 1 }}
      key={product.id}
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
            <Text className="font-poppins-medium text-lg text-primary-text">
              {product.name}
            </Text>
            <Text className="font-poppins-regular text-xs text-secondary-text">
              {product.special_ingredient}
            </Text>
          </View>
          <View className="flex-row justify-between items-center mt-4">
            <Text className="font-poppins-semibold text-primary-orange text-lg">
              ${" "}
              <Text className="text-primary-text">
                {product.prices[0].price}
              </Text>
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <BgIcon
                color={Colors[colorScheme].primaryTextHex}
                name="add"
                BgColor={Colors[colorScheme].primaryOrangeHex}
                size={20}
                iconSet="Ionicons"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SearchCard;
