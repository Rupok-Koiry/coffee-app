import { Dimensions, FlatList, StatusBar, Text, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/theme/theme";
import PopUpAnimation from "@/components/PopUpAnimation";
import HeaderBar from "@/components/HeaderBar";
import EmptyListAnimation from "@/components/EmptyListAnimation";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderData from "@/data/OrderData";
import OrderHistoryCard from "@/components/OrderCard";
import Button from "@/components/Button";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
const initialLayout = { width: Dimensions.get("window").width };

const OrderScreen = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "active", title: "Active Orders" },
    { key: "archived", title: "Archived Orders" },
  ]);
  const activeOrders = OrderData.filter(
    (order) => order.status === "confirmed"
  );
  const archivedOrders = OrderData.filter(
    (order) => order.status === "delivered"
  );

  const renderOrders = (orders: any) => (
    <View className="flex-1">
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyListAnimation title={"No Order History"} />}
        contentContainerStyle={{
          padding: 20,
          gap: 32,
        }}
        renderItem={({ item }) => (
          <OrderHistoryCard
            key={item.id}
            navigationHandler={() => {}}
            cart={item.cart}
            totalPrice={item.total_price}
            orderDate={item.order_date}
          />
        )}
        ListFooterComponent={
          <Button onPress={buttonPressHandler}>Download</Button>
        }
      />
    </View>
  );

  const ActiveOrdersRoute = () => renderOrders(activeOrders);
  const ArchivedOrdersRoute = () => renderOrders(archivedOrders);

  const renderScene = SceneMap({
    active: ActiveOrdersRoute,
    archived: ArchivedOrdersRoute,
  });

  const buttonPressHandler = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 3000);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-black">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {showAnimation && (
        <PopUpAnimation
          style={{ height: 300 }}
          source={require("@/lottie/download.json")}
        />
      )}

      <View className="flex-1">
        <HeaderBar title="Order History" />
        <View className="flex-1 justify-between">
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get("window").width }}
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
                renderLabel={({ route, focused, color }) => (
                  <Text
                    className={`mb-2  ${
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
