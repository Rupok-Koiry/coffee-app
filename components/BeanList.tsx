import { FlatList, TouchableOpacity, StyleSheet, Text } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import CoffeeCard from "./CoffeeCard";
import BeansData from "@/data/BeansData";

const BeanList = () => {
  const router = useRouter();
  return (
    <FlatList
      horizontal
      ListEmptyComponent={
        <Text className="font-poppins-semibold text-primary-light-grey text-lg text-center">
          No Bean Available
        </Text>
      }
      showsHorizontalScrollIndicator={false}
      data={BeansData}
      contentContainerStyle={styles.FlatListContainer}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              router.push(`/(tabs)/product/${item.id}?type=${item.type}`);
            }}
          >
            <CoffeeCard
              id={item.id}
              index={item.index}
              type={item.type}
              roasted={item.roasted}
              imagelinkSquare={item.imagelink_square}
              name={item.name}
              specialIngredient={item.special_ingredient}
              averageRating={item.average_rating}
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
  },
});

export default BeanList;
