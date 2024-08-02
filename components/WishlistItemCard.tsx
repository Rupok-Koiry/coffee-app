import { Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import ImageBackgroundInfo from "./ImageBackgroundInfo";
import { COLORS } from "@/theme/theme";
import { Enums } from "@/constants/database.types";

interface WishlistItemCardProps {
  id: number;
  image_portrait: string;
  name: string;
  special_ingredient: string;
  type: Enums<"product_type_enum">;
  ingredients: string;
  average_rating: number;
  ratings_count: number;
  roasted: string;
  description: string;
  isFavorite: boolean;
  toggleFavorite: () => void;
}

const WishlistItemCard: React.FC<WishlistItemCardProps> = ({
  id,
  image_portrait,
  name,
  special_ingredient,
  type,
  ingredients,
  average_rating,
  ratings_count,
  roasted,
  description,
  isFavorite,
  toggleFavorite,
}) => {
  return (
    <View className="rounded-2xl overflow-hidden">
      <ImageBackgroundInfo
        id={id}
        enableBackHandler={false}
        image_portrait={image_portrait}
        type={type}
        isFavorite={isFavorite}
        name={name}
        special_ingredient={special_ingredient}
        ingredients={ingredients}
        average_rating={average_rating}
        ratings_count={ratings_count}
        roasted={roasted}
        toggleFavorite={toggleFavorite}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={{ gap: 12 }}
        className="p-5"
      >
        <Text className="font-poppins-semibold text-base text-secondary-light-grey">
          Description
        </Text>
        <Text
          className="font-poppins-regular text-sm text-primary-white"
          numberOfLines={5}
        >
          {description}
        </Text>
      </LinearGradient>
    </View>
  );
};

export default WishlistItemCard;
