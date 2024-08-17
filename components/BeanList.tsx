import { Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import CoffeeCard from "./CoffeeCard";
import { useRouter } from "expo-router";
import { useProducts } from "@/hooks/products/useProducts";
import CoffeeCardSkeleton from "./loader/CoffeeCardSkeleton";
import ErrorMessage from "./ErrorMessage";
import { addItemToCart } from "@/features/cartSlice";

const BeanList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    products: beans,
    isFetching,
    error,
    hasNextPage,
    fetchNextPage,
  } = useProducts({ type: "BEAN" });

  const loadMore = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  if (error) return <ErrorMessage message={error.message} />;

  // Add skeleton items when fetching
  const dataWithSkeletons = isFetching
    ? [...beans, ...Array(3).fill({ isSkeleton: true })]
    : beans;

  return (
    <FlatList
      horizontal
      ListEmptyComponent={
        <Text className="font-poppins-semibold text-primary-light-grey text-lg text-center">
          No Bean Available
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
              router.push(`/(tabs)/product/${item.id}`);
            }}
          >
            <CoffeeCard
              image_square={item.image_square}
              name={item.name}
              special_ingredient={item.special_ingredient}
              average_rating={item.average_rating}
              price={item.prices[2].price}
              buttonPressHandler={() =>
                dispatch(
                  addItemToCart({
                    product: item,
                    prices: [
                      {
                        size: item.prices[0].size,
                        price: item.prices[0].price,
                        quantity: 1,
                        total_price: item.prices[0].price,
                      },
                    ],
                  })
                )
              }
            />
          </TouchableOpacity>
        );
      }}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default BeanList;

const styles = StyleSheet.create({
  FlatListContainer: {
    gap: 16,
    paddingVertical: 20,
  },
});
