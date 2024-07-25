import CartItem from "@/components/CartItem";
import EmptyListAnimation from "@/components/EmptyListAnimation";
import HeaderBar from "@/components/HeaderBar";
import PaymentFooter from "@/components/PaymentFooter";
import CartData from "@/data/CartData";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CartScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="bg-primary-black flex-1">
      <View className="flex-1">
        <View className="flex-1">
          <HeaderBar title="Cart" />

          <FlatList
            data={CartData}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  router.push(`/(tabs)/product/${item.id}?type=${item.type}`);
                }}
                key={item.id}
              >
                <CartItem
                  id={item.id}
                  name={item.name}
                  imagelink_square={item.imagelink_square}
                  special_ingredient={item.special_ingredient}
                  roasted={item.roasted}
                  prices={item.prices}
                  type={item.type}
                  incrementCartItemQuantityHandler={() => {}}
                  decrementCartItemQuantityHandler={() => {}}
                />
              </TouchableOpacity>
            )}
            contentContainerStyle={{
              paddingHorizontal: 20,
              gap: 20,
            }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <EmptyListAnimation title={"Your cart is empty!"} />
            )}
          />
        </View>

        {CartData.length > 0 && (
          <PaymentFooter
            buttonPressHandler={() => router.push("/product/payment")}
            buttonTitle="Pay"
            price={{ price: "20", currency: "$" }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
