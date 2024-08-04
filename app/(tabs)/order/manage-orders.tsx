import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "@/components/HeaderBar";
import { COLORS } from "@/theme/theme";
import OrderTable from "@/components/OrderTable";
import { Enums, orderStatuses } from "@/constants/types";

const ManageOrderScreen = () => {
  const [selectedStatus, setSelectedStatus] = useState<
    Enums<"order_status_enum"> | ""
  >("");

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
              <TouchableOpacity
                className={`items-center justify-center rounded-2xl px-3 py-2 ${
                  selectedStatus === ""
                    ? "bg-primary-orange"
                    : "bg-primary-grey"
                }`}
                onPress={() => setSelectedStatus("")}
              >
                <Text className="font-poppins-semibold text-xs text-primary-white">
                  All
                </Text>
              </TouchableOpacity>
              {orderStatuses.map((status) => (
                <TouchableOpacity
                  className={`items-center justify-center rounded-2xl px-3 py-2 ${
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
          <OrderTable filterStatus={selectedStatus} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageOrderScreen;
