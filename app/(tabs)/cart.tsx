import CartItem from "@/components/CartItem";
import HeaderBar from "@/components/HeaderBar";
import PaymentFooter from "@/components/PaymentFooter";
import CartData from "@/data/CartData";
import { COLORS } from "@/theme/theme";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CartScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView className="bg-primary-black flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View className="flex-1 justify-between">
          <View>
            <HeaderBar title="Cart" />

            {CartData.length == 0 ? (
              <>{/* <EmptyListAnimation title={"Cart is Empty"} /> */}</>
            ) : (
              <View className="px-5 gap-5">
                {CartData.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push("Details", {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}
                  >
                    <CartItem
                      id={data.id}
                      name={data.name}
                      imagelink_square={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      roasted={data.roasted}
                      prices={data.prices}
                      type={data.type}
                      incrementCartItemQuantityHandler={() => {}}
                      decrementCartItemQuantityHandler={() => {}}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {CartData.length > 0 ? (
            <PaymentFooter
              buttonPressHandler={() => {}}
              buttonTitle="Pay"
              price={{ price: "20", currency: "$" }}
            />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ScrollViewFlex: {
    flexGrow: 1,
  },
});

export default CartScreen;
