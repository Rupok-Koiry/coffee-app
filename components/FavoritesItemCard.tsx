import { StyleSheet, Text, View, ImageProps } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import ImageBackgroundInfo from "./ImageBackgroundInfo";
import { COLORS } from "@/theme/theme";

interface FavoritesItemCardProps {
  id: string;
  imagelinkPortrait: ImageProps;
  name: string;
  specialIngredient: string;
  type: string;
  ingredients: string;
  averageRating: number;
  ratingsCount: string;
  roastedLevel: string;
  description: string;
  isFavorite: boolean;
  toggleFavorite: any;
}

const FavoritesItemCard: React.FC<FavoritesItemCardProps> = ({
  id,
  imagelinkPortrait,
  name,
  specialIngredient,
  type,
  ingredients,
  averageRating,
  ratingsCount,
  roastedLevel,
  description,
  isFavorite,
  toggleFavorite,
}) => {
  return (
    <View className="rounded-2xl overflow-hidden">
      <ImageBackgroundInfo
        id={id}
        enableBackHandler={false}
        imagelinkPortrait={imagelinkPortrait}
        type={type}
        isFavorite={isFavorite}
        name={name}
        specialIngredient={specialIngredient}
        ingredients={ingredients}
        averageRating={averageRating}
        ratingsCount={ratingsCount}
        roastedLevel={roastedLevel}
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
        <Text className="font-poppins-regular text-sm text-primary-white">
          {description}
        </Text>
      </LinearGradient>
    </View>
  );
};

export default FavoritesItemCard;
