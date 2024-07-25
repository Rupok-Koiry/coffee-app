import { Text, FlatList, ScrollView, StatusBar } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "@/components/HeaderBar";
import SearchInput from "@/components/SearchInput";
import Categories from "@/components/Categories";
import CoffeeList from "@/components/CoffeeList";
import BeanList from "@/components/BeanList";
import { COLORS } from "@/theme/theme";

const HomeScreen = () => {
  const listRef = useRef<FlatList<any>>(null);

  return (
    <SafeAreaView className="bg-primary-black flex-1">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView>
        <HeaderBar />
        <Text className="font-poppins-semibold text-3xl px-5 text-primary-white">
          Find the best{"\n"}coffee for you
        </Text>
        <SearchInput searchCoffee={() => {}} resetSearchCoffee={() => {}} />

        <Categories listRef={listRef} />
        <CoffeeList ref={listRef} />
        <Text className="text-lg ml-5 mt-5 font-poppins-medium text-secondary-light-grey">
          Coffee Beans
        </Text>
        <BeanList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
