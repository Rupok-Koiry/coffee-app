import React, { useState } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "@/components/HeaderBar";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

const OrderTrackingScreen = () => {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const [orderId, setOrderId] = useState<string>("");

  const handleTrackOrder = () => {
    router.push(`/(tabs)/order/${orderId}`);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme].primaryBackgroundHex,
      }}
    >
      <StatusBar backgroundColor={Colors[colorScheme].primaryBackgroundHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderBar title="Track Order" />
        <View className="p-5 flex-1">
          <View className="flex-row mb-5 rounded-xl bg-secondary-background items-center border border-primary-grey">
            <TouchableOpacity onPress={handleTrackOrder}>
              <Ionicons
                style={{ marginHorizontal: 12 }}
                name="search"
                size={16}
                color={Colors[colorScheme].accentTextHex}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Enter your order id"
              cursorColor={Colors[colorScheme].primaryOrangeHex}
              onChangeText={(text) => setOrderId(text.replace("#", ""))}
              onSubmitEditing={handleTrackOrder}
              placeholderTextColor={Colors[colorScheme].accentTextHex}
              className="flex-1 font-poppins-medium text-sm text-primary-text py-3"
              keyboardType="numeric"
            />
          </View>
          <Button onPress={handleTrackOrder}>Track Order</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderTrackingScreen;
