import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/theme/theme";

const reviews = [
  {
    id: 1,
    name: "Joan Perkins",
    rating: 5,
    date: "1 day ago",
    text: "This chair is a great addition for any room in your home, not only just the living room...",
    avatar: "https://via.placeholder.com/50", // Placeholder image URL
  },
  {
    id: 2,
    name: "Frank Garrett",
    rating: 4,
    date: "4 days ago",
    text: "Suspendisse potenti. Nullam tincidunt lacus tellus, aliquam est vehicula a...",
    avatar: "https://via.placeholder.com/50", // Placeholder image URL
  },
  {
    id: 20,
    name: "Frank Garrett",
    rating: 4,
    date: "4 days ago",
    text: "Suspendisse potenti. Nullam tincidunt lacus tellus, aliquam est vehicula a...",
    avatar: "https://via.placeholder.com/50", // Placeholder image URL
  },
];

const ReviewList = () => (
  <FlatList
    scrollEnabled={false}
    data={reviews}
    contentContainerStyle={{ gap: 16 }}
    renderItem={({ item }) => (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-4 rounded-xl mx-5"
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      >
        <View className="flex-row mb-4">
          <Image
            source={{ uri: item.avatar }}
            className="w-12 h-12 rounded-full mr-3"
          />
          <View className="flex-1">
            <View className="flex-row justify-between items-center mb-0.5">
              <Text className="font-poppins-semibold text-base text-secondary-light-grey">
                {item.name}
              </Text>
              <View className="flex-row items-center space-x-0.5">
                {[...Array(item.rating)].map((_, i) => (
                  <Ionicons
                    key={i}
                    name="star"
                    size={14}
                    color={COLORS.primaryOrangeHex}
                  />
                ))}
                <Text className="text-xs font-poppins-medium text-primary-white">
                  {item.rating}
                </Text>
              </View>
            </View>
            <Text className="text-xs font-poppins-regular mb-3 text-secondary-light-grey">
              {item.date}
            </Text>
            <Text className="font-poppins-regular text-primary-white">
              {item.text}
            </Text>
          </View>
        </View>
      </LinearGradient>
    )}
    keyExtractor={(item) => item.id.toString()}
  />
);

export default ReviewList;
