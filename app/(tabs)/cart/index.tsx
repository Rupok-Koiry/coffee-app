import CartItem from "@/components/CartItem";
import EmptyListAnimation from "@/components/EmptyListAnimation";
import HeaderBar from "@/components/HeaderBar";
import PaymentFooter from "@/components/PaymentFooter";
import CartData from "@/data/CartData";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CartScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="bg-primary-black flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1">
          <View className="flex-1 justify-between">
            <HeaderBar title="Cart" />
            {CartData.length > 0 ? (
              <View className="px-5 space-y-5">
                {CartData.map((item) => (
                  <TouchableOpacity
                    onPress={() => {
                      router.push(
                        `/(tabs)/product/${item.id}?type=${item.type}`
                      );
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
                ))}
              </View>
            ) : (
              <EmptyListAnimation title={"Your cart is empty!"} />
            )}
          </View>

          {CartData.length > 0 && (
            <PaymentFooter
              buttonPressHandler={() => router.push("/(tabs)/cart/payment")}
              buttonTitle="Pay"
              price={{ price: "20", currency: "$" }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;
