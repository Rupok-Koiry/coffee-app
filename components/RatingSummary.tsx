import React from "react";
import { View, Text } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/theme/theme";

const RatingSummary = () => {
  return (
    <View className="p-5 flex-row items-center" style={{ gap: 20 }}>
      <View>
        <Text className="text-6xl font-poppins-semibold text-primary-white text-center py-2">
          4.3
        </Text>
        <Text className="text-secondary-light-grey text-center -mt-3">
          23 ratings
        </Text>
      </View>
      <View className="flex-col flex-1">
        {[5, 4, 3, 2, 1].map((star, index) => (
          <View key={index} className="flex-row items-center my-0.5">
            <Ionicons name="star" size={20} color={COLORS.primaryOrangeHex} />
            <Text className="ml-2 text-base font-poppins-regular  text-secondary-light-grey">
              {star}
            </Text>
            <View className="h-2 bg-primary-dark-grey rounded-full flex-1 mx-3">
              <View
                className="h-full bg-primary-orange rounded-full"
                style={{ width: `${(star / 5) * 100}%` }}
              />
            </View>
            <Text className="font-poppins-regular text-primary-white">12</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default RatingSummary;
