import { View, FlatList } from "react-native";
import React, { useCallback } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import OrderHistoryCard from "@/components/OrderCard";
import EmptyListAnimation from "@/components/EmptyListAnimation";
import { useMyOrders } from "@/hooks/orders/useMyOrders";
import { useRouter } from "expo-router";
import Loader from "@/components/loaders/Loader";
import { useColorScheme } from "nativewind";

const ArchiveOrders = () => {
  const { colorScheme } = useColorScheme();

  const router = useRouter();
  const { orders, error, fetchNextPage, hasNextPage, isLoading } = useMyOrders([
    "CANCELLED",
    "DELIVERED",
  ]);
  const loadMore = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message="Order could not be load!" />;
  return (
    <View className="flex-1">
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<EmptyListAnimation title="No Order History" />}
        contentContainerStyle={{ padding: 20, gap: 32 }}
        renderItem={({ item }) => (
          <OrderHistoryCard
            key={item.id}
            navigationHandler={() => {
              router.push(`/(tabs)/order/${item.id}`);
            }}
            order_id={item.id}
            order_items={item.order_items}
            total_price={item.total_price}
            order_date={item.created_at}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default ArchiveOrders;
