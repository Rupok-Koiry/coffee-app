import { useColorScheme } from "nativewind";
import { useWishlist } from "@/hooks/wishlist/useWishlist";
import EmptyListAnimation from "@/components/EmptyListAnimation";
import ErrorMessage from "@/components/ErrorMessage";
import WishlistItemCard from "@/components/WishlistItemCard";
import HeaderBar from "@/components/HeaderBar";
import Loader from "@/components/loaders/Loader";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
  View,
  StatusBar,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDeleteWishlist } from "@/hooks/wishlist/useDeleteWishlist";
import { Pressable } from "react-native";

const WishlistScreen = () => {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const { wishlist, isLoading, error, hasNextPage, fetchNextPage } =
    useWishlist();
  const { deleteWishlist } = useDeleteWishlist();

  const loadMore = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  const removeWishlist = (productId: number) => {
    deleteWishlist(productId);
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <SafeAreaView className="flex-1 bg-primary-background">
      <StatusBar backgroundColor={Colors[colorScheme].primaryBackgroundHex} />
      <ScrollView>
        <View className="flex-1">
          <HeaderBar title="Wishlist" />
          <FlatList
            scrollEnabled={false}
            ListEmptyComponent={
              <EmptyListAnimation title="Your wishlist is empty!" />
            }
            data={wishlist}
            contentContainerStyle={styles.flatListContainer}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  router.push(`/(tabs)/product/${item.product_id}`);
                }}
                key={item.id}
              >
                {item.product && (
                  <WishlistItemCard
                    product={item.product}
                    isFavorite={true}
                    toggleFavorite={() => removeWishlist(item.id)}
                  />
                )}
              </Pressable>
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  flatListContainer: {
    gap: 20,
    padding: 20,
  },
});
