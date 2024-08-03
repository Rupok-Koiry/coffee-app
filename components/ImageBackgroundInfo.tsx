import React from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import GradientIcon from "./GradientIcon";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "@/theme/theme";
import { Tables } from "@/constants/types";
import { SUPABASE_URL } from "@/services/supabase";

type ImageBackgroundInfoProps = {
  product: Tables<"products">;
  enableBackHandler: boolean;
  isFavorite: boolean;
  backHandler?: () => void;
  toggleFavorite: () => void;
};

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
  product: {
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
                color={COLORS.secondaryLightGreyHex}
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
                    ? COLORS.primaryRedHex
                    : COLORS.secondaryLightGreyHex
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
                    ? COLORS.primaryRedHex
                    : COLORS.secondaryLightGreyHex
                }
                size={20}
                iconSet="Ionicons"
              />
            </TouchableOpacity>
          </View>
        )}

        <View className="p-5 bg-primary-black-rgba rounded-t-3xl">
          <View className="justify-between space-y-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-poppins-semibold text-xl text-primary-white mb-0.5">
                  {name}
                </Text>
                <Text className="font-poppins-medium text-xs text-secondary-light-grey">
                  {special_ingredient}
                </Text>
              </View>
              <View className="flex-row items-center space-x-5">
                <View className="h-14 w-14 rounded-lg justify-center items-center bg-primary-dark-grey">
                  {type === "BEAN" ? (
                    <MaterialCommunityIcons
                      name="fruit-cherries"
                      size={24}
                      color={COLORS.primaryOrangeHex}
                    />
                  ) : (
                    <Feather
                      name="coffee"
                      size={24}
                      color={COLORS.primaryOrangeHex}
                    />
                  )}
                  <Text
                    className={`font-poppins-medium text-xs text-secondary-light-grey mt-0.5 capitalize`}
                  >
                    {type}
                  </Text>
                </View>
                <View className="h-14 w-14 rounded-xl justify-center items-center bg-primary-dark-grey">
                  <Ionicons
                    name={type === "BEAN" ? "location" : "water"}
                    size={24}
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text className="font-poppins-medium text-xs text-secondary-light-grey mt-0.5">
                    {ingredients}
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex-row justify-between items-center">
              <View className="flex-row space-x-3 items-center">
                <Ionicons
                  name="star"
                  color={COLORS.primaryOrangeHex}
                  size={20}
                />
                <Text className="font-poppins-semibold text-lg text-primary-white">
                  {average_rating}
                </Text>
                <Text className="font-poppins-regular text-xs text-primary-white">
                  ({ratings_count})
                </Text>
              </View>
              <View className="h-14 w-[132px] rounded-lg justify-center items-center bg-primary-dark-grey">
                <Text className="font-poppins-regular text-xs text-secondary-light-grey">
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
