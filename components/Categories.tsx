import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";

type CategoriesProps = {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
};
const Categories = ({
  categories,
  activeCategory,
  setActiveCategory,
}: CategoriesProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="space-x-4"
    >
      {categories.map((category, index) => (
        <View key={index.toString()}>
          <TouchableOpacity
            className="items-center"
            onPress={() => {
              setActiveCategory(category);
            }}
          >
            <Text
              className={`font-poppins-semibold 
              ${
                category == activeCategory
                  ? "text-primary-orange"
                  : "text-primary-light-grey"
              }
                `}
            >
              {category}
            </Text>
            {category === activeCategory && (
              <View className="h-2 w-2 rounded-full bg-primary-orange" />
            )}
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default Categories;
