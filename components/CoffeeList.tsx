import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { forwardRef } from "react";
import CoffeeData from "@/data/CoffeeData";
import CoffeeCard from "./CoffeeCard";
import { useRouter } from "expo-router";

const CoffeeList = forwardRef<FlatList<any>, any>((_, ref) => {
  const router = useRouter();
  return (
    <FlatList
      ref={ref}
      horizontal
      ListEmptyComponent={
        <View className="py-9 items-center justify-center">
          <Text className="font-poppins-semibold text-primary-light-grey mb-1 text-base">
            No Coffee Available
          </Text>
        </View>
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
});

export default CoffeeList;
const styles = StyleSheet.create({
  FlatListContainer: {
    gap: 16,
    paddingVertical: 20,
    paddingHorizontal: 32,
  },
});
