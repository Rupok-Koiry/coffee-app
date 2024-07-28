import { View, Text, ScrollView, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "@/components/HeaderBar";
import { COLORS } from "@/theme/theme";
import OrderTable from "@/components/OrderTable";

const ManageOrderScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary-black">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderBar title="Profile" />
        <View className="px-5">
          <OrderTable />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageOrderScreen;
