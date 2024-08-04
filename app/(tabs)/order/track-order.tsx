import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { COLORS } from "@/theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "@/components/HeaderBar";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

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
        <View className="p-5">
          <TextInput
            placeholder="Enter your order id"
            placeholderTextColor={COLORS.primaryLightGreyHex}
            className="rounded-xl flex-1 font-poppins-medium text-base text-primary-white p-3 bg-primary-dark-grey mb-5 border border-primary-grey"
            cursorColor={COLORS.primaryOrangeHex}
            onChangeText={(text) => setOrderId(text.replace("#", ""))}
            onSubmitEditing={handleTrackOrder}
          />
          <Button onPress={handleTrackOrder}>Track Order</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderTrackingScreen;
