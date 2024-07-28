import { Dimensions, ScrollView, StatusBar, Text, View } from "react-native";
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
      {orders.length == 0 ? (
        <EmptyListAnimation title={"No Order History"} />
      ) : (
        <View className="px-5" style={{ gap: 32 }}>
          {orders.map((order: any) => (
            <OrderHistoryCard
              key={order.id}
              navigationHandler={() => {}}
              cart={order.cart}
              totalPrice={order.total_price}
              orderDate={order.order_date}
            />
          ))}
        </View>
      )}
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
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
                  marginBottom: 32,
                }}
                renderLabel={({ route, focused, color }) => (
                  <Text style={{ color: COLORS.primaryWhiteHex, margin: 8 }}>
                    {route.title}
                  </Text>
                )}
              />
            )}
          />
          {OrderData.length > 0 && (
            <Button containerClassName="m-5" onPress={buttonPressHandler}>
              Download
            </Button>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderScreen;
