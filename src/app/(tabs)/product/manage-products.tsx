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
import { useColorScheme } from "nativewind";
import ProductTable from "@/components/ProductTable";
import { Enums } from "@/constants/types";
import withAuthorization from "@/utils/withAuthorization";
import { Colors } from "@/constants/Colors";

const productTypes: Enums<"product_type_enum">[] = ["COFFEE", "BEAN"];

const ManageProductScreen = () => {
  const { colorScheme } = useColorScheme();

  const [selectedType, setSelectedType] = useState<
    Enums<"product_type_enum"> | ""
  >("");

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors[colorScheme].primaryBackgroundHex,
        flex: 1,
      }}
    >
      <StatusBar backgroundColor={Colors[colorScheme].primaryBackgroundHex} />
      <HeaderBar title="Manage Order" />

      <View className="px-5">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row mb-5 gap-3">
            <TouchableOpacity
              className={` items-center justify-center rounded-2xl px-3 py-2 ${
                selectedType === "" ? "bg-primary-orange" : "bg-primary-grey"
              }`}
              onPress={() => {
                setSelectedType("");
              }}
            >
              <Text className="font-poppins-semibold text-xs text-primary-text ">
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
                <Text className="font-poppins-semibold text-xs text-primary-text ">
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <View className="px-5 flex-1">
        <ProductTable type={selectedType} />
      </View>
    </SafeAreaView>
  );
};

export default withAuthorization(ManageProductScreen, ["ADMIN"]);
