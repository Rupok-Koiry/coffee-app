import EmptyListAnimation from "@/components/EmptyListAnimation";
import FavoritesItemCard from "@/components/FavoritesItemCard";
import HeaderBar from "@/components/HeaderBar";
import CoffeeData from "@/data/CoffeeData";
import { COLORS } from "@/theme/theme";
import { useRouter } from "expo-router";
import React from "react";
import { View, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FavoritesScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-primary-black">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 justify-between">
          <View className="flex-1">
            <HeaderBar title="Favorites" />

            {CoffeeData.length == 0 ? (
              <EmptyListAnimation title={"No Favorites"} />
            ) : (
              <View className="px-5" style={{ gap: 20 }}>
                {CoffeeData.map((product) => (
                  <TouchableOpacity
                    onPress={() => {
                      router.push(
                        `/(tabs)/product/${product.id}?type=${product.type}`
                      );
                    }}
                    key={product.id}
                  >
                    <FavoritesItemCard
                      id={product.id}
                      imagelinkPortrait={product.imagelink_portrait}
                      name={product.name}
                      specialIngredient={product.special_ingredient}
                      type={product.type}
                      ingredients={product.ingredients}
                      averageRating={product.average_rating}
                      ratingsCount={product.ratings_count}
                      roastedLevel={product.roasted}
                      description={product.description}
                      isFavorite={product.isFavorite}
                      toggleFavorite={() => {}}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavoritesScreen;
