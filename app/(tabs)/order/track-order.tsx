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

const OrderTrackingScreen = () => {
  const router = useRouter();
  const [orderId, setOrderId] = useState<string>("");

  const handleTrackOrder = () => {
    router.push(`/(tabs)/order/${orderId}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-black">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderBar title="Track Order" />
        <View className="p-5 flex-1">
          <View className="flex-row mb-5 rounded-xl bg-primary-dark-grey items-center border border-primary-grey">
            <TouchableOpacity onPress={handleTrackOrder}>
              <Ionicons
                style={{ marginHorizontal: 12 }}
                name="search"
                size={16}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Enter your order id"
              cursorColor={COLORS.primaryOrangeHex}
              onChangeText={(text) => setOrderId(text.replace("#", ""))}
              onSubmitEditing={handleTrackOrder}
              placeholderTextColor={COLORS.primaryLightGreyHex}
              className="flex-1 font-poppins-medium text-sm text-primary-white py-3"
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
