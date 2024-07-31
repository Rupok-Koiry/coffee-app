import { FlatList, TouchableOpacity, StyleSheet, Text } from "react-native";
import React, { useCallback } from "react";
import { useRouter } from "expo-router";
import CoffeeCard from "./CoffeeCard";
import { useProducts } from "@/api/products/useProducts";
import CoffeeCardSkeleton from "./loader/CoffeeCardSkeleton";
import ErrorText from "./ErrorText";

const BeanList = () => {
  const router = useRouter();
  const {
    products: beans,
    fetchNextPage,
    isFetching,
    error,
    hasNextPage,
  } = useProducts("BEAN");

  const loadMore = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);
  if (isFetching) return <CoffeeCardSkeleton />;
  if (error) return <ErrorText message={error.message} />;

  return (
    <FlatList
      horizontal
      ListEmptyComponent={
        <Text className="font-poppins-semibold text-primary-light-grey text-lg text-center">
          No Bean Available
        </Text>
      }
      showsHorizontalScrollIndicator={false}
      data={beans}
      contentContainerStyle={styles.FlatListContainer}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              router.push(`/(tabs)/product/${item.id}?type=${item.type}`);
            }}
          >
            <CoffeeCard
              image_square={item.image_square}
              name={item.name}
              special_ingredient={item.special_ingredient}
              average_rating={item.average_rating}
              price={item.prices[2].price}
              buttonPressHandler={() => {}}
            />
          </TouchableOpacity>
        );
      }}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
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
