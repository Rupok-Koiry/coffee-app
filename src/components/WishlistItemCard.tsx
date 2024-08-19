import { Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import ImageBackgroundInfo from "./ImageBackgroundInfo";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";
import { Tables } from "@/constants/types";

type WishlistItemCardProps = {
  product: Tables<"products">;
  isFavorite: boolean;
  toggleFavorite: () => void;
};

const WishlistItemCard: React.FC<WishlistItemCardProps> = ({
  product,
  isFavorite,
  toggleFavorite,
}) => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="rounded-2xl overflow-hidden">
      <ImageBackgroundInfo
        product={product}
        isFavorite={isFavorite}
        enableBackHandler={false}
        toggleFavorite={toggleFavorite}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[
          Colors[colorScheme].secondaryGreyHex,
          Colors[colorScheme].primaryBackgroundHex,
        ]}
        style={{ gap: 12 }}
        className="p-5"
      >
        <Text className="font-poppins-semibold text-base text-secondary-text">
          Description
        </Text>
        <Text
          className="font-poppins-regular text-sm text-primary-text"
          numberOfLines={5}
        >
          {product.description}
        </Text>
      </LinearGradient>
    </View>
  );
};

export default WishlistItemCard;
