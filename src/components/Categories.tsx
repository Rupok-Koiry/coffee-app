import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";

type CategoriesProps = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
};
const categories = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Americano",
    value: "Americano",
  },
  {
    label: "Latte",
    value: "Latte",
  },
  {
    label: "Cappuccino",
    value: "Cappuccino",
  },
  {
    label: "Espresso",
    value: "Espresso",
  },
  {
    label: "Macchiato",
    value: "Macchiato",
  },
];
const Categories = ({ activeCategory, setActiveCategory }: CategoriesProps) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((category, index) => (
        <View key={index.toString()}>
          <TouchableOpacity
            className="items-center mx-2"
            onPress={() => {
              setActiveCategory(category.value);
            }}
          >
            <Text
              className={`font-poppins-semibold 
              ${
                category.value == activeCategory
                  ? "text-primary-orange"
                  : "text-accent-text"
              }
                `}
            >
              {category.label}
            </Text>
            {category.value === activeCategory && (
              <View className="h-2 w-2 rounded-full bg-primary-orange" />
            )}
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default Categories;
