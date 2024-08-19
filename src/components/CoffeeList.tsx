import { Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useColorScheme } from "nativewind";
import CoffeeCard from "./CoffeeCard";
import { useRouter } from "expo-router";
import { useProducts } from "@/hooks/products/useProducts";
import CoffeeCardSkeleton from "./loaders/CoffeeCardSkeleton";
import ErrorMessage from "./ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "@/features/cartSlice";

type CoffeeListProps = {
  activeCategory: string;
};

const CoffeeList = ({ activeCategory }: CoffeeListProps) => {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const dispatch = useDispatch();

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

  if (error) return <ErrorMessage message={error.message} />;

  // Add skeleton items when fetching
  const dataWithSkeletons = isFetching
    ? [...coffees, ...Array(3).fill({ isSkeleton: true })]
    : coffees;

  return (
    <FlatList
      horizontal
      ListEmptyComponent={
        <Text className="font-poppins-semibold text-accent-text text-lg text-center">
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
              router.push(`/(tabs)/product/${item.id}`);
            }}
          >
            <CoffeeCard
              image_square={item.image_square}
              name={item.name}
              special_ingredient={item.special_ingredient}
              average_rating={item.average_rating}
              price={item.prices[0].price}
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

export default CoffeeList;

const styles = StyleSheet.create({
  FlatListContainer: {
    gap: 16,
    paddingVertical: 20,
  },
});
