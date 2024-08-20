import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BgIcon from "./BgIcon";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";
import { SUPABASE_URL } from "@/services/supabase";
import * as Haptics from "expo-haptics";

const CARD_WIDTH = Dimensions.get("window").width * 0.32;

type CoffeeCardProps = {
  image_square: string;
  name: string;
  special_ingredient: string;
  average_rating: number;
  buttonPressHandler: () => void;
  price: number;
};

const CoffeeCard: React.FC<CoffeeCardProps> = ({
  image_square,
  name,
  special_ingredient,
  average_rating,
  price,
  buttonPressHandler,
}) => {
  const { colorScheme } = useColorScheme();
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="p-3"
      style={{ borderRadius: 16 }}
      colors={[
        Colors[colorScheme].secondaryGreyHex,
        Colors[colorScheme].primaryBackgroundHex,
      ]}
    >
      <ImageBackground
        source={{
          uri: `${SUPABASE_URL}/storage/v1/object/public/product-images/square/${image_square}`,
        }}
        className="w-full h-full rounded-2xl mb-4 overflow-hidden"
        style={{ width: CARD_WIDTH, height: CARD_WIDTH }}
        resizeMode="cover"
      >
        <View
          className="flex-row bg-primary-overlay items-start justify-center px-3 py-2 absolute  rounded-bl-2xl top-0 right-0"
          style={{ gap: 8 }}
        >
          <Ionicons
            name={"star"}
            color={Colors[colorScheme].primaryOrangeHex}
            size={12}
          />
          <Text className="font-poppins-medium text-primary-text text-xs">
            {average_rating}
          </Text>
        </View>
      </ImageBackground>
      <Text className="font-poppins-medium text-primary-text text-base mb-0.5">
        {name}
      </Text>
      <Text className="font-poppins-regular text-primary-text text-xs">
        {special_ingredient}
      </Text>
      <View className="flex-row justify-between items-center mt-4">
        <Text className="font-poppins-semibold text-primary-orange text-lg">
          $ <Text className="text-primary-text">{price}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            buttonPressHandler();
          }}
        >
          <BgIcon
            color={Colors[colorScheme].primaryTextHex}
            name="add"
            BgColor={Colors[colorScheme].primaryOrangeHex}
            size={20}
            iconSet="Ionicons"
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default CoffeeCard;
