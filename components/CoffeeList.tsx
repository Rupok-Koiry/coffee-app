import { Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import CoffeeData from "@/data/CoffeeData";
import CoffeeCard from "./CoffeeCard";
import { useRouter } from "expo-router";

const CoffeeList = () => {
  const router = useRouter();
  return (
    <FlatList
      horizontal
      ListEmptyComponent={
        <Text className="font-poppins-semibold text-primary-light-grey text-lg text-center">
          No Coffee Available
        </Text>
      }
      showsHorizontalScrollIndicator={false}
      data={CoffeeData}
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

export default CoffeeList;
const styles = StyleSheet.create({
  FlatListContainer: {
    gap: 16,
    paddingVertical: 20,
  },
});
