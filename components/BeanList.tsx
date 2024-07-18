import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { router, useRouter } from "expo-router";
import CoffeeCard from "./CoffeeCard";
import BeansData from "@/data/BeansData";

const BeanList = () => {
  const router = useRouter();
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={BeansData}
      contentContainerStyle={styles.FlatListContainer}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              router.push("product-details");
            }}
          >
            <CoffeeCard
              id={item.id}
              index={item.index}
              type={item.type}
              roasted={item.roasted}
              imagelink_square={item.imagelink_square}
              name={item.name}
              special_ingredient={item.special_ingredient}
              average_rating={item.average_rating}
              price={item.prices[2]}
              buttonPressHandler={() => {}}
            />
          </TouchableOpacity>
        );
      }}
    />
  );
};
const styles = StyleSheet.create({
  FlatListContainer: {
    gap: 16,
    paddingVertical: 20,
    paddingHorizontal: 32,
  },
});

export default BeanList;
