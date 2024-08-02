import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/theme/theme";
import HeaderBar from "@/components/HeaderBar";
import SearchInput from "@/components/SearchInput";
import { useProducts } from "@/api/products/useProducts";
import { SUPABASE_URL } from "@/services/supabase";
import { useRouter } from "expo-router";
import SearchCard from "@/components/SearchCard";
import SearchCardSkeleton from "@/components/loader/SearchCardSkeleton";
import ErrorMessage from "@/components/ErrorMessage";

const SearchScreen = () => {
  const router = useRouter();
  const { products, isFetching, error, hasNextPage, fetchNextPage } =
    useProducts({});

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      console.log("FETCHING NEXT PAGE");

      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  if (error) return <ErrorMessage message={error.message} />;

  // Add skeleton items when fetching
  const dataWithSkeletons = isFetching
    ? [...products, ...Array(3).fill({ isSkeleton: true })]
    : products;

  return (
    <SafeAreaView className="bg-primary-black flex-1">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView>
        <HeaderBar title="Search" />
        <View className="px-5">
          <SearchInput
            onSearch={(text) => {
              router.setParams({ search: text });
            }}
          />
          <FlatList
            data={dataWithSkeletons}
            scrollEnabled={false}
            contentContainerStyle={styles.FlatListContainer}
            ListEmptyComponent={
              <ErrorMessage
                message={
                  "No products found.\n Try searching for something else."
                }
              />
            }
            keyExtractor={(item, index) =>
              item.isSkeleton ? `skeleton-${index}` : item.id.toString()
            }
            renderItem={({ item }) => {
              if (item.isSkeleton) {
                return <SearchCardSkeleton />;
              }

              return (
                <TouchableOpacity
                  onPress={() => {
                    router.push(`/(tabs)/product/${item.id}`);
                  }}
                >
                  <SearchCard product={item} />
                </TouchableOpacity>
              );
            }}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  FlatListContainer: {
    gap: 16,
  },
});
