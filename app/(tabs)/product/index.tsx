import { Text, ScrollView, StatusBar, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "@/components/HeaderBar";
import SearchInput from "@/components/SearchInput";
import Categories from "@/components/Categories";
import CoffeeList from "@/components/CoffeeList";
import BeanList from "@/components/BeanList";
import { COLORS } from "@/theme/theme";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("");
  return (
    <SafeAreaView className="bg-primary-black flex-1">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView>
        <HeaderBar />
        <View className="px-5">
          <Text className="font-poppins-semibold text-3xl text-primary-white">
            Find the best{"\n"}coffee for you
          </Text>
          <SearchInput
            onSearch={(text) => {
              console.log(text);
            }}
          />
          <Categories
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <CoffeeList activeCategory={activeCategory} />
          <Text className="text-lg mt-5 font-poppins-medium text-primary-white">
            Coffee Beans
          </Text>
          <BeanList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
