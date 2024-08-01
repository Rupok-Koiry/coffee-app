import { Dimensions, FlatList, StatusBar, Text, View } from "react-native";
import React, { useState, useCallback } from "react";
import { COLORS } from "@/theme/theme";
import PopUpAnimation from "@/components/PopUpAnimation";
import HeaderBar from "@/components/HeaderBar";
import EmptyListAnimation from "@/components/EmptyListAnimation";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderHistoryCard from "@/components/OrderCard";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useOrders } from "@/api/orders/useOrders";
import { TransformedOrder } from "@/services/apiOrders";

const initialLayout = { width: Dimensions.get("window").width };

const OrderScreen = () => {
  const {
    orders: activeOrders,
    error: activeError,
    fetchNextPage: fetchNextActivePage,
    hasNextPage: hasNextActivePage,
    isLoading: isLoadingActive,
  } = useOrders({ status: "CONFIRMED" });
  const {
    orders: archivedOrders,
    error: archivedError,
    fetchNextPage: fetchNextArchivedPage,
    hasNextPage: hasNextArchivedPage,
    isLoading: isLoadingArchived,
  } = useOrders({ status: "DELIVERED" });

  const renderOrders = (
    orders:TransformedOrder[],
    isLoading,
    error,
    fetchNextPage,
    hasNextPage
  ) => (
    <View className="flex-1">
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<EmptyListAnimation title={"No Order History"} />}
        contentContainerStyle={{ padding: 20, gap: 32 }}
        renderItem={({ item }) => (
          <OrderHistoryCard
            key={item.id}
            navigationHandler={() => {}}
            order_id={item.id}
            order_items={item.order_items}
            total_price={item.total_price}
            order_date={item.order_date}
          />
        )}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoading ? <Text>Loading...</Text> : null}
      />
      {error && <Text>Error: {error.message}</Text>}
    </View>
  );

  const ActiveOrdersRoute = () =>
    renderOrders(
      activeOrders,
      isLoadingActive,
      activeError,
      fetchNextActivePage,
      hasNextActivePage
    );
  const ArchivedOrdersRoute = () =>
    renderOrders(
      archivedOrders,
      isLoadingArchived,
      archivedError,
      fetchNextArchivedPage,
      hasNextArchivedPage
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
