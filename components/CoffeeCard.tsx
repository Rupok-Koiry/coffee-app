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
import { COLORS } from "@/theme/theme";

const CARD_WIDTH = Dimensions.get("window").width * 0.32;

interface CoffeeCardProps {
  id: string;
  imagelinkSquare: ImageProps;
  name: string;
  specialIngredient: string;
  averageRating: number;
  price: PricesType;
  buttonPressHandler: () => void;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({
  id,
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
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
    >
      <ImageBackground
        source={imagelinkSquare}
        className="w-full h-full rounded-2xl mb-4 overflow-hidden"
        style={{ width: CARD_WIDTH, height: CARD_WIDTH }}
        resizeMode="cover"
      >
        <View
          className="flex-row bg-primary-black-rgba items-start justify-center px-3 py-2 absolute  rounded-bl-2xl top-0 right-0"
          style={{ gap: 8 }}
        >
          <Ionicons name={"star"} color={COLORS.primaryOrangeHex} size={12} />
          <Text className="font-poppins-medium text-primary-white text-xs">
            {averageRating}
          </Text>
        </View>
      </ImageBackground>
      <Text className="font-poppins-medium text-primary-white text-base mb-0.5">
        {name}
      </Text>
      <Text className="font-poppins-regular text-primary-white text-xs">
        {specialIngredient}
      </Text>
      <View className="flex-row justify-between items-center mt-4">
        <Text className="font-semibold text-primary-orange text-lg">
          $ <Text className="text-primary-white">{price.price}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            buttonPressHandler();
          }}
        >
          <BgIcon
            color={COLORS.primaryWhiteHex}
            name="add"
            BgColor={COLORS.primaryOrangeHex}
            size={20}
            iconSet="Ionicons"
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default CoffeeCard;
