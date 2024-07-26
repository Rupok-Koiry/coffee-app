import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import CoffeeData from "@/data/CoffeeData";
import { SafeAreaView } from "react-native-safe-area-context";
import PaymentFooter from "@/components/PaymentFooter";
import ImageBackgroundInfo from "@/components/ImageBackgroundInfo";
import { useLocalSearchParams } from "expo-router";
import { PricesType } from "@/constants/types";
import { COLORS } from "@/theme/theme";

const DetailsScreen = () => {
  const { productId, type } = useLocalSearchParams();

  const product = CoffeeData[0];
  const [fullDesc, setFullDesc] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(product.prices[0]);

  return (
    <SafeAreaView className="flex-1 bg-primary-black">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackgroundInfo
          enableBackHandler={true}
          imagelinkPortrait={product.imagelink_portrait}
          type={product.type}
          id={product.id}
          isFavorite={product.isFavorite}
          name={product.name}
          specialIngredient={product.special_ingredient}
          ingredients={product.ingredients}
          averageRating={product.average_rating}
          ratingsCount={product.ratings_count}
          roastedLevel={product.roasted}
          backHandler={() => {}}
          toggleFavorite={() => {}}
        />

        <View className="p-5">
          <Text className="font-poppins-semibold text-primary-white text-base mb-3">
            Description
          </Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc((prev) => !prev);
              }}
            >
              <Text className="font-poppins-regular text-sm mb-8 text-primary-white tracking-wider">
                {product.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc((prev) => !prev);
              }}
            >
              <Text
                numberOfLines={3}
                className="font-poppins-regular text-sm mb-8 text-primary-white tracking-wider"
              >
                {product.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text className="font-poppins-semibold text-primary-white text-base mb-3">
            Size
          </Text>
          <View className="flex-row flex-1 justify-between" style={{ gap: 20 }}>
            {product.prices.map((price: PricesType) => (
              <TouchableOpacity
                key={price.size}
                onPress={() => {
                  setSelectedPrice(price);
                }}
                className={`flex-1 bg-primary-dark-grey items-center justify-center  rounded-xl h-12
                border-2
                ${
                  price.size == selectedPrice.size
                    ? "border-primary-orange"
                    : "border-primary-dark-grey"
                }
                `}
              >
                <Text
                  className={`font-poppins-medium
                  ${
                    price.size == selectedPrice.size
                      ? "text-primary-orange"
                      : "text-secondary-light-grey"
                  }

                  ${product.type == "Bean" ? "text-sm" : "text-base"}
                  `}
                >
                  {price.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={selectedPrice}
          buttonTitle="Add to Cart"
          buttonPressHandler={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
