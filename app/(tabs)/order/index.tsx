import React, { useState, useCallback } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { COLORS } from "@/theme/theme";
import PopUpAnimation from "@/components/PopUpAnimation";
import HeaderBar from "@/components/HeaderBar";
import EmptyListAnimation from "@/components/EmptyListAnimation";
import OrderHistoryCard from "@/components/OrderCard";
import { TransformedOrder } from "@/services/apiOrders";
import ErrorMessage from "@/components/ErrorMessage";
import { useRouter } from "expo-router";
import { useMyOrders } from "@/api/orders/useMyOrders";
import Button from "@/components/Button";

const initialLayout = { width: Dimensions.get("window").width };

const OrderScreen: React.FC = () => {
  const router = useRouter();
  const {
    orders: activeOrders,
    error: activeError,
    fetchNextPage: fetchNextActivePage,
    hasNextPage: hasNextActivePage,
    isLoading: isLoadingActive,
  } = useMyOrders(["PLACED", "ON_THE_WAY", "CONFIRMED"]);

  const {
    orders: archivedOrders,
    error: archivedError,
    fetchNextPage: fetchNextArchivedPage,
    hasNextPage: hasNextArchivedPage,
    isLoading: isLoadingArchived,
  } = useMyOrders(["DELIVERED", "CANCELLED"]);

  const loadMoreActiveOrders = useCallback(() => {
    if (hasNextActivePage) fetchNextActivePage();
  }, [hasNextActivePage, fetchNextActivePage]);
  const loadMoreArchivedOrders = useCallback(() => {
    if (hasNextArchivedPage) fetchNextArchivedPage();
  }, [hasNextArchivedPage, fetchNextArchivedPage]);
  const renderOrders = useCallback(
    (
      orders: TransformedOrder[],
      isLoading: boolean,
      error: any,
      fetchNextPage: () => void,
      hasNextPage: boolean,
      loadMore: () => void
    ) => (
      <View style={{ flex: 1 }}>
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
              order_date={item.order_date}
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
        {error && <ErrorMessage message="Order could not be load!" />}
      </View>
    ),
    []
  );

  const ActiveOrdersRoute = useCallback(
    () =>
      renderOrders(
        activeOrders,
        isLoadingActive,
        activeError,
        fetchNextActivePage,
        hasNextActivePage,
        loadMoreActiveOrders
      ),
    [
      activeOrders,
      isLoadingActive,
      activeError,
      fetchNextActivePage,
      hasNextActivePage,
      renderOrders,
      loadMoreActiveOrders,
    ]
  );

  const ArchivedOrdersRoute = useCallback(
    () =>
      renderOrders(
        archivedOrders,
        isLoadingArchived,
        archivedError,
        fetchNextArchivedPage,
        hasNextArchivedPage,
        loadMoreArchivedOrders
      ),
    [
      archivedOrders,
      isLoadingArchived,
      archivedError,
      fetchNextArchivedPage,
      hasNextArchivedPage,
      renderOrders,
      loadMoreArchivedOrders,
    ]
  );

  const renderScene = SceneMap({
    active: ActiveOrdersRoute,
    archived: ArchivedOrdersRoute,
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "active", title: "Active Orders" },
    { key: "archived", title: "Archived Orders" },
  ]);

  return (
    <SafeAreaView className="flex-1 bg-primary-black">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <View className="flex-1">
        <HeaderBar title="Order History" />
        <Button href="/(tabs)/order/list">Click</Button>
        <View className="flex-1 justify-between">
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                indicatorStyle={{
                  backgroundColor: COLORS.primaryOrangeHex,
                  borderRadius: 12,
                  height: 2,
                }}
                style={{
                  backgroundColor: COLORS.primaryBlackHex,
                }}
                renderLabel={({ route, focused }) => (
                  <Text
                    className={`mb-2 ${
                      focused ? "text-primary-orange" : "text-primary-white"
                    } font-poppins-medium text-base`}
                  >
                    {route.title}
                  </Text>
                )}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderScreen;
