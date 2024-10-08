import { Text, ScrollView, StatusBar, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "@/components/HeaderBar";
import SearchInput from "@/components/SearchInput";
import Categories from "@/components/Categories";
import CoffeeList from "@/components/CoffeeList";
import BeanList from "@/components/BeanList";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";
import LogoImage from "@/components/LogoImage";

const HomeScreen = () => {
  const { colorScheme } = useColorScheme();

  const [activeCategory, setActiveCategory] = useState("");
  const router = useRouter();
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors[colorScheme].primaryBackgroundHex,
        flex: 1,
      }}
    >
      <StatusBar backgroundColor={Colors[colorScheme].primaryBackgroundHex} />
      <ScrollView>
        <View className={`flex-row justify-center`}>
          <LogoImage className="w-32 h-32" />
        </View>
        <View className="px-5">
          <Text className="font-poppins-semibold text-3xl text-primary-text mb-5">
            Find the best coffee for you!
          </Text>
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
          <Text className="text-lg mb-3  font-poppins-medium text-primary-text">
            Coffee Beans
          </Text>
          <BeanList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
