import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const Categories = () => {
  const categories = ["All", "Espresso", "Latte", "Cappuccino", "Macchiato"];
  const [activeCategory, setActiveCategory] = useState("All");

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
