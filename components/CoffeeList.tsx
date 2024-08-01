import { Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import React, { useCallback, useEffect } from "react";
import CoffeeCard from "./CoffeeCard";
import { useRouter } from "expo-router";
import { useProducts } from "@/api/products/useProducts";
import CoffeeCardSkeleton from "./loader/CoffeeCardSkeleton";
import ErrorText from "./ErrorText";

type CoffeeListProps = {
  activeCategory: string;
};

const CoffeeList = ({ activeCategory }: CoffeeListProps) => {
  const router = useRouter();
  const {
    products: coffees,
    isFetching,
    error,
    hasNextPage,
    fetchNextPage,
  } = useProducts({ type: "COFFEE", filter: activeCategory });

  const loadMore = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  if (error) return <ErrorText message={error.message} />;

  // Add skeleton items when fetching
  const dataWithSkeletons = isFetching
    ? [...coffees, ...Array(3).fill({ isSkeleton: true })]
    : coffees;

  return (
    <FlatList
      horizontal
      ListEmptyComponent={
        <Text className="font-poppins-semibold text-primary-light-grey text-lg text-center">
          No Coffee Available
        </Text>
      }
      showsHorizontalScrollIndicator={false}
      data={dataWithSkeletons}
      contentContainerStyle={styles.FlatListContainer}
      keyExtractor={(item, index) =>
        item.isSkeleton ? `skeleton-${index}` : item.id.toString()
      }
      renderItem={({ item }) => {
        if (item.isSkeleton) {
          return <CoffeeCardSkeleton />;
        }

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

export default CoffeeList;

const styles = StyleSheet.create({
  FlatListContainer: {
    gap: 16,
    paddingVertical: 20,
  },
});
