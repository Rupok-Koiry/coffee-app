import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  ImageProps,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PricesType } from "@/constants/types";
import BgIcon from "./BgIcon";

const CARD_WIDTH = Dimensions.get("window").width * 0.32;

interface CoffeeCardProps {
  id: string;
  index: number;
  type: string;
  roasted: string;
  imagelinkSquare: ImageProps;
  name: string;
  specialIngredient: string;
  averageRating: number;
  price: PricesType;
  buttonPressHandler: () => void;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({
  id,
  index,
  type,
  roasted,
  imagelinkSquare,
  name,
  specialIngredient,
  averageRating,
  price,
  buttonPressHandler,
}) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="p-3 rounded-2xl"
      colors={["#333333", "#000000"]}
    >
      <ImageBackground
        source={imagelinkSquare}
        className="w-full h-full rounded-2xl mb-4 overflow-hidden"
        style={{ width: CARD_WIDTH, height: CARD_WIDTH }}
        resizeMode="cover"
      >
        <View
          className="flex-row bg-primary-black-rgba items-start justify-center  p-2 absolute rounded-tr-2xl rounded-bl-2xl top-0 right-0"
          style={{ gap: 8 }}
        >
          <Ionicons name={"star"} color="#FFA500" size={12} />
          <Text className="font-medium text-primary-white text-xs">
            {averageRating}
          </Text>
        </View>
      </ImageBackground>
      <Text className="font-medium text-primary-white text-base">{name}</Text>
      <Text className="font-light text-primary-white text-xs">
        {specialIngredient}
      </Text>
      <View className="flex-row justify-between items-center mt-4">
        <Text className="font-semibold text-orange-500 text-lg">
          $ <Text className="text-primary-white">{price.price}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            buttonPressHandler();
          }}
        >
          <BgIcon
            color="#FFFFFF"
            name="add"
            BgColor="#FFA500"
            size={16}
            iconSet="Ionicons"
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default CoffeeCard;
