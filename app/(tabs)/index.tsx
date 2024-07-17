import { View, Text, FlatList } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "@/components/HeaderBar";
import SearchInput from "@/components/SearchInput";
import Categories from "@/components/Categories";

const HomeScreen = () => {
  const listRef: any = useRef<FlatList>();
  return (
    <SafeAreaView className="bg-primary-black flex-1">
      <HeaderBar />
      <Text className="font-poppins-semibold text-3xl px-8 text-primary-white">
        Find the best{"\n"}coffee for you
      </Text>
      <SearchInput searchCoffee={() => {}} resetSearchCoffee={() => {}} />

      <Categories listRef={listRef} />

      <FlatList
        ref={listRef}
        horizontal
        ListEmptyComponent={
          <View style={styles.EmptyListContainer}>
            <Text style={styles.CategoryText}>No Coffee Available</Text>
          </View>
        }
        showsHorizontalScrollIndicator={false}
        data={sortedCoffee}
        contentContainerStyle={styles.FlatListContainer}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.push("Details", {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                });
              }}
            >
              <Text>HELLO WORLD!</Text>

              {/* <CoffeeCard
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                name={item.name}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[2]}
                buttonPressHandler={CoffeCardAddToCart}
              /> */}
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
