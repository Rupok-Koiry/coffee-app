import React from "react";
import { useColorScheme } from "nativewind";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
import GradientIcon from "./GradientIcon";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Tables } from "@/constants/types";
import { SUPABASE_URL } from "@/services/supabase";
import { Link, router } from "expo-router";

type ImageBackgroundInfoProps = {
  product: Tables<"products">;
  enableBackHandler: boolean;
  isFavorite: boolean;
  backHandler?: () => void;
  toggleFavorite: () => void;
};

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
  product: {
    id,
    image_portrait,
    name,
    special_ingredient,
    type,
    ingredients,
    average_rating,
    ratings_count,
    roasted,
  },
  isFavorite,
  enableBackHandler,
  backHandler,
  toggleFavorite,
}) => {
  const { colorScheme } = useColorScheme();
  return (
    <View>
      <ImageBackground
        source={{
          uri: `${SUPABASE_URL}/storage/v1/object/public/product-images/portrait/${image_portrait}`,
        }}
        className="w-full aspect-[4/5] justify-between"
      >
        {enableBackHandler ? (
          <View className="p-5 flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => {
                backHandler?.();
              }}
            >
              <GradientIcon
                name="chevron-back"
                color={Colors[colorScheme].secondaryTextHex}
                size={20}
                iconSet="Ionicons"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                toggleFavorite();
              }}
            >
              <GradientIcon
                name="heart"
                color={
                  isFavorite
                    ? Colors[colorScheme].primaryRedHex
                    : Colors[colorScheme].secondaryTextHex
                }
                size={20}
                iconSet="Ionicons"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View className="p-5 flex-row items-center justify-end">
            <TouchableOpacity
              onPress={() => {
                toggleFavorite();
              }}
            >
              <GradientIcon
                name="heart"
                color={
                  isFavorite
                    ? Colors[colorScheme].primaryRedHex
                    : Colors[colorScheme].secondaryTextHex
                }
                size={20}
                iconSet="Ionicons"
              />
            </TouchableOpacity>
          </View>
        )}

        <View className="p-5 bg-primary-overlay rounded-t-3xl">
          <View
            className="flex-row justify-between items-center"
            style={{ gap: 20 }}
          >
            <View>
              <Text className="font-poppins-semibold text-xl text-white mb-0.5">
                {name}
              </Text>
              <Text className="font-poppins-medium text-xs text-white mb-5">
                {special_ingredient}
              </Text>
              <Pressable
                className="flex-row items-center"
                style={{ gap: 12 }}
                onPress={() => router.push(`/(tabs)/product/${id}/reviews`)}
              >
                <Ionicons
                  name="star"
                  color={Colors[colorScheme].primaryOrangeHex}
                  size={20}
                />
                <Text className="font-poppins-semibold text-lg text-white">
                  {average_rating}
                </Text>
                <Text className="font-poppins-regular text-xs text-white">
                  ({ratings_count})
                </Text>
              </Pressable>
            </View>
            <View className="flex-1">
              <View
                className="flex-row items-center gap-5 mb-5"
                style={{ gap: 20 }}
              >
                <View className="h-14 flex-1 rounded-lg justify-center items-center bg-secondary-background">
                  {type === "BEAN" ? (
                    <MaterialCommunityIcons
                      name="fruit-cherries"
                      size={24}
                      color={Colors[colorScheme].primaryOrangeHex}
                    />
                  ) : (
                    <Feather
                      name="coffee"
                      size={24}
                      color={Colors[colorScheme].primaryOrangeHex}
                    />
                  )}
                  <Text
                    className={`font-poppins-medium text-xs text-secondary-text mt-0.5 capitalize`}
                  >
                    {type}
                  </Text>
                </View>
                <View className="h-14 flex-1 rounded-xl justify-center items-center bg-secondary-background">
                  <Ionicons
                    name={type === "BEAN" ? "location" : "water"}
                    size={24}
                    color={Colors[colorScheme].primaryOrangeHex}
                  />
                  <Text className="font-poppins-medium text-xs text-secondary-text mt-0.5">
                    {ingredients}
                  </Text>
                </View>
              </View>
              <View className="h-14 rounded-lg justify-center items-center bg-secondary-background">
                <Text className="font-poppins-regular text-xs text-secondary-text">
                  {roasted}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ImageBackgroundInfo;
