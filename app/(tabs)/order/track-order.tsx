import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "@/theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "@/components/HeaderBar";
import Button from "@/components/Button";

const OrderTrackingScreen = () => {
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
            className=" rounded-xl flex-1 font-poppins-medium text-base text-primary-white p-3 bg-primary-dark-grey mb-5 border border-primary-grey"
            cursorColor={COLORS.primaryOrangeHex}
          />
          <Button>Track Order</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderTrackingScreen;
