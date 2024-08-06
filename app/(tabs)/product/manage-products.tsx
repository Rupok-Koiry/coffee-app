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
import ProductTable from "@/components/ProductTable";
import { Enums } from "@/constants/types";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const productTypes: Enums<"product_type_enum">[] = ["COFFEE", "BEAN"];
const ManageProductScreen = () => {
  const [selectedType, setSelectedType] = useState("");
  return (
    <SafeAreaView className="flex-1 bg-primary-black">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderBar title="Manage Order" />

        <View className="p-5">
          <Link href={`/(tabs)/product/add-update-product`}>
            <Ionicons
              name="add-circle"
              size={20}
              color={COLORS.primaryLightGreyHex}
            />
          </Link>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-3 mb-5">
              <TouchableOpacity
                className={` items-center justify-center rounded-2xl px-3 py-2 ${
                  selectedType === "" ? "bg-primary-orange" : "bg-primary-grey"
                }`}
                onPress={() => {
                  setSelectedType("");
                }}
              >
                <Text className="font-poppins-semibold text-xs text-primary-white ">
                  All
                </Text>
              </TouchableOpacity>
              {productTypes.map((type) => (
                <TouchableOpacity
                  className={` items-center justify-center rounded-2xl px-3 py-2 ${
                    selectedType === type
                      ? "bg-primary-orange"
                      : "bg-primary-grey"
                  }`}
                  key={type}
                  onPress={() => {
                    setSelectedType(type);
                  }}
                >
                  <Text className="font-poppins-semibold text-xs text-primary-white ">
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <ProductTable type={selectedType} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageProductScreen;
