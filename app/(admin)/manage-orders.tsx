import { View, Text, StatusBar, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "@/components/HeaderBar";
import { COLORS } from "@/theme/theme";

const ManageOrderScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary-black">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderBar title="Manage Order" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageOrderScreen;
