import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";

type CategoriesProps = {
  listRef: any;
};

const Categories = ({ listRef }: CategoriesProps) => {
  const categories = ["All", "Espresso", "Latte", "Cappuccino", "Macchiato"];
  const [activeCategory, setActiveCategory] = useState("All");
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="px-5 mb-0"
    >
      {categories.map((category, index) => (
        <View key={index.toString()} className="px-4">
          <TouchableOpacity
            className="items-center"
            onPress={() => {
              listRef?.current?.scrollToOffset({
                animated: true,
                offset: 0,
              });
              setActiveCategory(category);
            }}
          >
            <Text
              className={`font-poppins-semibold mb-1 text-base 
              ${
                category == activeCategory
                  ? "text-primary-orange"
                  : "text-primary-light-grey"
              }
                `}
            >
              {category}
            </Text>
            {category === activeCategory ? (
              <View className="h-2 w-2 rounded-full bg-primary-orange" />
            ) : (
              <></>
            )}
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default Categories;
