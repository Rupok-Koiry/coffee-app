import {
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "@/components/HeaderBar";
import { COLORS } from "@/theme/theme";
import OrderTable from "@/components/OrderTable";
import ProductTable from "@/components/ProductTable";

const statuses = [
  { title: "All", status: "all" },
  { title: "Coffee", status: "coffee" },
  { title: "Beans", status: "beans" },
];
const ManageProductScreen = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  return (
    <SafeAreaView className="flex-1 bg-primary-black">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderBar title="Manage Order" />

        <View className="p-5">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-3 mb-5">
              {statuses.map((status) => (
                <TouchableOpacity
                  className={` items-center justify-center rounded-2xl px-3 py-2 ${
                    selectedStatus === status.status
                      ? "bg-primary-orange"
                      : "bg-primary-grey"
                  }`}
                  key={status.status}
                  onPress={() => setSelectedStatus(status.status)}
                >
                  <Text className="font-poppins-semibold text-xs text-primary-white">
                    {status.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <ProductTable />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageProductScreen;
