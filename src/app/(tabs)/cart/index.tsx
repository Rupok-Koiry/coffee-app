import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import HeaderBar from "@/components/HeaderBar";
import CartItem from "@/components/CartItem";
import EmptyListAnimation from "@/components/EmptyListAnimation";
import PaymentFooter from "@/components/PaymentFooter";
import { removeItemFromCart, updateItemQuantity } from "@/features/cartSlice";
import { RootState } from "@/features/store";
import * as Haptics from "expo-haptics";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";

const CartScreen: React.FC = () => {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const handleQuantityChange = (id: number, size: string, quantity: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    dispatch(updateItemQuantity({ id, size, quantity }));
  };

  const handleNavigateToProduct = (productId: number) => {
    router.push(`/(tabs)/product/${productId}`);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors[colorScheme].primaryBackgroundHex,
        flex: 1,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderBar title="Cart" />
        <View className="flex-1 justify-between">
          {cart.items.length > 0 ? (
            <View className="px-5" style={{ gap: 20 }}>
              {cart.items.map((item) => (
                <TouchableOpacity
                  key={item.product.id}
                  onPress={() => handleNavigateToProduct(item.product.id)}
                >
                  <CartItem
                    item={item}
                    incrementQuantity={(size, quantity) =>
                      handleQuantityChange(item.product.id, size, quantity + 1)
                    }
                    decrementQuantity={(size, quantity) =>
                      handleQuantityChange(item.product.id, size, quantity - 1)
                    }
                    removeItem={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      dispatch(removeItemFromCart(item.product.id));
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <EmptyListAnimation title="Your cart is empty!" />
          )}
          {cart.items.length > 0 && (
            <PaymentFooter
              buttonPressHandler={() => router.push("/(tabs)/cart/payment")}
              buttonTitle="Pay"
              price={cart.total_price}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;
