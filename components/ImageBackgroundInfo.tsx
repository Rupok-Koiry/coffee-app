import React from "react";
import {
  Text,
  View,
  ImageProps,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import GradientIcon from "./GradientIcon";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "@/theme/theme";

interface ImageBackgroundInfoProps {
  enableBackHandler: boolean;
  imagelinkPortrait: ImageProps;
  type: string;
  id: string;
  isFavorite: boolean;
  name: string;
  specialIngredient: string;
  ingredients: string;
  averageRating: number;
  ratingsCount: string;
  roastedLevel: string;
  backHandler?: () => void;
  toggleFavorite: () => void;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
  enableBackHandler,
  imagelinkPortrait,
  type,
  isFavorite,
  name,
  specialIngredient,
  ingredients,
  averageRating,
  ratingsCount,
  roastedLevel,
  backHandler,
  toggleFavorite,
}) => {
  return (
    <View>
      <ImageBackground
        source={imagelinkPortrait}
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
                <Text className="font-poppins-semibold text-2xl text-primary-white">
                  {name}
                </Text>
                <Text className="font-poppins-medium text-xs text-secondary-light-grey">
                  {specialIngredient}
                </Text>
              </View>
              <View className="flex-row items-center space-x-5">
                <View className="h-14 w-14 rounded-lg justify-center items-center bg-primary-dark-grey">
                  {type === "Bean" ? (
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
                    className={`font-poppins-medium text-xs text-secondary-light-grey mt-0.5`}
                  >
                    {type}
                  </Text>
                </View>
                <View className="h-14 w-14 rounded-xl justify-center items-center bg-primary-dark-grey">
                  <Ionicons
                    name={type === "Bean" ? "location" : "water"}
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
                  {averageRating}
                </Text>
                <Text className="font-poppins-regular text-xs text-primary-white">
                  ({ratingsCount})
                </Text>
              </View>
              <View className="h-14 w-[132px] rounded-lg justify-center items-center bg-primary-dark-grey">
                <Text className="font-poppins-regular text-xs text-secondary-light-grey">
                  {roastedLevel}
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
