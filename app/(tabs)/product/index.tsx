import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "@/components/HeaderBar";
import SearchInput from "@/components/SearchInput";
import Categories from "@/components/Categories";
import CoffeeList from "@/components/CoffeeList";
import BeanList from "@/components/BeanList";

const HomeScreen = () => {
  const listRef = useRef<FlatList<any>>(null);

  return (
    <SafeAreaView className="bg-primary-black flex-1">
      <ScrollView>
        <HeaderBar />
        <Text className="font-poppins-semibold text-3xl px-8 text-primary-white">
          Find the best{"\n"}coffee for you
        </Text>
        <SearchInput searchCoffee={() => {}} resetSearchCoffee={() => {}} />

        <Categories listRef={listRef} />
        <CoffeeList ref={listRef} />
        <Text className="text-lg ml-8 mt-5 font-poppins-medium text-secondary-light-grey">
          Coffee Beans
        </Text>

        <BeanList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
