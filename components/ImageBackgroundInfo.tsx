import React from "react";
import {
  Text,
  View,
  ImageProps,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import GradientIcon from "./GradientIcon";
import {
  Feather,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { COLORS } from "@/theme/theme";

interface ImageBackgroundInfoProps {
  enableBackHandler: boolean;
  imageLinkPortrait: ImageProps;
  type: string;
  id: string;
  isFavorite: boolean;
  name: string;
  specialIngredient: string;
  ingredients: string;
  averageRating: number;
  ratingsCount: string;
  roastedLevel: string;
  backHandler: () => void;
  toggleFavorite: () => void;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
  enableBackHandler,
  imageLinkPortrait,
  type,
  id,
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
        source={imageLinkPortrait}
        className="w-full aspect-[4/5] justify-between"
      >
        {enableBackHandler ? (
          <View className="p-8 flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => {
                backHandler();
              }}
            >
              <GradientIcon
                name="chevron-back"
                color={COLORS.secondaryLightGreyHex}
                size={16}
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
                size={16}
                iconSet="Ionicons"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View className="p-8 flex-row items-center justify-end">
            <TouchableOpacity
              onPress={() => {
                toggleFavorite();
              }}
            >
              <GradientIcon
                name="heart"
                color={
                  isFavorite ? "text-primary-red" : "text-secondary-light-grey"
                }
                size={16}
                iconSet="Ionicons"
              />
            </TouchableOpacity>
          </View>
        )}

        <View className="py-6 px-8 bg-primary-black-rgba rounded-t-3xl">
          <View className="justify-between space-y-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-semibold text-2xl text-primary-white">
                  {name}
                </Text>
                <Text className="font-medium text-xs text-primary-white">
                  {specialIngredient}
                </Text>
              </View>
              <View className="flex-row items-center space-x-5">
                <View className="h-14 w-14 rounded-lg justify-center items-center bg-primary-black">
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
                    className={`font-medium text-xs text-secondary-light-grey mt-0.5`}
                  >
                    {type}
                  </Text>
                </View>
                <View className="h-14 w-14 rounded-xl justify-center items-center bg-primary-black">
                  <Ionicons
                    name={type === "Bean" ? "location" : "water"}
                    size={24}
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text className="font-medium text-xs text-secondary-light-grey mt-0.5">
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
                <Text className="font-semibold text-lg text-primary-white">
                  {averageRating}
                </Text>
                <Text className="font-regular text-xs text-primary-white">
                  ({ratingsCount})
                </Text>
              </View>
              <View className="h-14 w-32  rounded-lg justify-center items-center bg-primary-black">
                <Text className="font-regular text-xs text-primary-white">
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
