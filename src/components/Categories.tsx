import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
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
  const { colorScheme } = useColorScheme();
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
