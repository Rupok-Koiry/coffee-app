import { Text, ScrollView, StatusBar, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import Categories from "@/components/Categories";
import CoffeeList from "@/components/CoffeeList";
import BeanList from "@/components/BeanList";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";

const HomeScreen = () => {
  const { colorScheme } = useColorScheme();
  const [activeCategory, setActiveCategory] = useState("");
  const router = useRouter();

  return (
    <SafeAreaView className={`bg-primary-background-${colorScheme} flex-1`}>
      <StatusBar backgroundColor={Colors[colorScheme].primaryBackgroundHex} />
      <ScrollView>
        <View className={`flex-row justify-center`}>
          <Image
            source={require("@/assets/app_images/logo.png")}
            className="w-32 h-32"
          />
        </View>
        <View className="px-5">
          <Text
            className={`font-poppins-semibold text-3xl text-primary-text-${colorScheme} mb-5`}
          >
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
          <Text
            className={`text-lg mt-5 font-poppins-medium text-primary-text-${colorScheme}`}
          >
            Coffee Beans
          </Text>
          <BeanList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
