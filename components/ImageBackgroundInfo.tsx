import React from "react";
import {
  Text,
  View,
  ImageProps,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import GradientIcon from "./GradientIcon";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/theme/theme";

interface ImageBackgroundInfoProps {
  EnableBackHandler: boolean;
  imagelink_portrait: ImageProps;
  type: string;
  id: string;
  favourite: boolean;
  name: string;
  special_ingredient: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  roasted: string;
  BackHandler?: any;
  ToggleFavourite: any;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
  EnableBackHandler,
  imagelink_portrait,
  type,
  id,
  favourite,
  name,
  special_ingredient,
  ingredients,
  average_rating,
  ratings_count,
  roasted,
  BackHandler,
  ToggleFavourite,
}) => {
  return (
    <View>
      <ImageBackground
        source={imagelink_portrait}
        className="w-full aspect-[4/5] justify-between"
      >
        {EnableBackHandler ? (
          <View className="p-8 flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => {
                BackHandler();
              }}
            >
              <GradientIcon
                name="hand-left"
                color={COLORS.secondaryLightGreyHex}
                size={16}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                ToggleFavourite(favourite, type, id);
              }}
            >
              <GradientIcon
                name="heart"
                color={
                  favourite
                    ? COLORS.primaryRedHex
                    : COLORS.secondaryLightGreyHex
                }
                size={16}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View className="p-8 flex-row items-center justify-end">
            <TouchableOpacity
              onPress={() => {
                ToggleFavourite(favourite, type, id);
              }}
            >
              <GradientIcon
                name="heart"
                color={
                  favourite ? "text-primary-red" : "text-secondary-light-grey"
                }
                size={16}
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
                  {special_ingredient}
                </Text>
              </View>
              <View className="flex-row items-center space-x-5">
                <View className="h-14 w-14 rounded-lg justify-center items-center bg-primary-black">
                  <Ionicons
                    name={type === "Bean" ? "basketball" : "glasses"}
                    size={24}
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text
                    className={`font-medium text-xs text-secondary-light-grey ${
                      type === "Bean" ? "mt-1.5" : ""
                    }`}
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
                  <Text className="font-medium text-xs text-secondary-light-grey mt-1.5">
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
                  {average_rating}
                </Text>
                <Text className="font-regular text-xs text-primary-white">
                  ({ratings_count})
                </Text>
              </View>
              <View className="h-14 w-[calc(55*2+20px)] rounded-lg justify-center items-center bg-primary-black">
                <Text className="font-regular text-xs text-primary-white">
                  {roasted}dd
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
