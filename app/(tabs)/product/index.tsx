import { Text, ScrollView, StatusBar, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "@/components/HeaderBar";
import SearchInput from "@/components/SearchInput";
import Categories from "@/components/Categories";
import CoffeeList from "@/components/CoffeeList";
import BeanList from "@/components/BeanList";
import { COLORS } from "@/theme/theme";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const router = useRouter();
  return (
    <SafeAreaView className="bg-primary-black flex-1">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView>
        <View className={`flex-row justify-between items-center p-5`}>
          <Image
            source={require("@/assets/app_images/logo.png")}
            className="w-24 h-24"
          />
          <Text className="font-poppins-semibold text-3xl text-primary-white">
            Find the best{"\n"}coffee for you!
          </Text>
        </View>
        <View className="px-5">
          <SearchInput
            onSearch={(text) => {
              router.push(`/(tabs)/product/search?search=${text}`);
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
