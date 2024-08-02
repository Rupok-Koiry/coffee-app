import { useWishlist } from "@/api/wishlist/useWishlist";
import EmptyListAnimation from "@/components/EmptyListAnimation";
import ErrorMessage from "@/components/ErrorMessage";
import WishlistItemCard from "@/components/WishlistItemCard";
import HeaderBar from "@/components/HeaderBar";
import Loader from "@/components/loader/Loader";
import { COLORS } from "@/theme/theme";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WishlistScreen = () => {
  const router = useRouter();
  const { wishlist, isLoading, error, hasNextPage, fetchNextPage } =
    useWishlist();

  const loadMore = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <SafeAreaView className="flex-1 bg-primary-black">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <View className="flex-1">
        <FlatList
          ListHeaderComponent={
            <HeaderBar title="Favorites" containerClassName="px-0" />
          }
          ListEmptyComponent={<EmptyListAnimation title={"No Favorites"} />}
          data={wishlist}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                router.push(`/(tabs)/product/${item.product_id}`);
              }}
              key={item.id}
            >
              {item.product && (
                <WishlistItemCard
                  id={item.id}
                  image_portrait={item.product.image_portrait}
                  name={item.product.name}
                  special_ingredient={item.product.special_ingredient}
                  type={item.product.type}
                  ingredients={item.product.ingredients}
                  average_rating={item.product.average_rating}
                  ratings_count={item.product.ratings_count}
                  roasted={item.product.roasted}
                  description={item.product.description}
                  isFavorite={true}
                  toggleFavorite={() => {}}
                />
              )}
            </TouchableOpacity>
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
    </SafeAreaView>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  FlatListContainer: {
    gap: 20,
    padding: 20,
  },
});
