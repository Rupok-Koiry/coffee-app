import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import CoffeeData from "@/data/CoffeeData";
import { SafeAreaView } from "react-native-safe-area-context";
import PaymentFooter from "@/components/PaymentFooter";
import ImageBackgroundInfo from "@/components/ImageBackgroundInfo";

const DetailsScreen = () => {
  const itemOfIndex = CoffeeData[0];
  const [fullDesc, setFullDesc] = useState(false);
  const [price, setPrice] = useState(itemOfIndex.prices[0]);

  return (
    <SafeAreaView className="flex-1 bg-primary-black">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={itemOfIndex.imagelink_portrait}
          type={itemOfIndex.type}
          id={itemOfIndex.id}
          favourite={itemOfIndex.favourite}
          name={itemOfIndex.name}
          special_ingredient={itemOfIndex.special_ingredient}
          ingredients={itemOfIndex.ingredients}
          average_rating={itemOfIndex.average_rating}
          ratings_count={itemOfIndex.ratings_count}
          roasted={itemOfIndex.roasted}
          BackHandler={() => {}}
          ToggleFavourite={() => {}}
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
                {itemOfIndex.description}
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
                {itemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text className="font-poppins-semibold text-primary-white text-base mb-3">
            Size
          </Text>
          <View className="flex-row flex-1 gap-x-5 justify-between">
            {itemOfIndex.prices.map((data: any) => (
              <TouchableOpacity
                key={data.size}
                onPress={() => {
                  setPrice(data);
                }}
                className={` flex-1 bg-primary-dark-grey  items-center justify-center  rounded-xl h-12
                border-2
                ${
                  data.size == price.size
                    ? "border-primary-orange"
                    : "border-primary-dark-grey"
                }
                `}
              >
                <Text
                  className={`font-poppins-medium
                  ${
                    data.size == price.size
                      ? "text-primary-orange"
                      : "text-secondary-light-grey"
                  }

                  ${itemOfIndex.type == "Bean" ? "text-sm" : "text-base"}
                  `}
                >
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={price}
          buttonTitle="Add to Cart"
          buttonPressHandler={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
