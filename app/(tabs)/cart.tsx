import CartItem from "@/components/CartItem";
import EmptyListAnimation from "@/components/EmptyListAnimation";
import HeaderBar from "@/components/HeaderBar";
import PaymentFooter from "@/components/PaymentFooter";
import CartData from "@/data/CartData";
import React from "react";
import {
  FlatList,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CartScreen = ({ navigation }: any) => {
  const renderCartItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => {
        navigation.push("Details", {
          index: item.index,
          id: item.id,
          type: item.type,
        });
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
  );

  return (
    <SafeAreaView className="bg-primary-black flex-1">
      <View className="flex-1">
        <View className="flex-1">
          <HeaderBar title="Cart" />

          <FlatList
            data={CartData}
            renderItem={renderCartItem}
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
            buttonPressHandler={() => {}}
            buttonTitle="Pay"
            price={{ price: "20", currency: "$" }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
