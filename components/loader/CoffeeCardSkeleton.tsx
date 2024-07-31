import { View, Text } from "react-native";
import React from "react";

const CoffeeCardSkeleton = () => {
  return (
    <View>
      <Text className="text-primary-white text-base font-poppins-light">
        Loading...
      </Text>
    </View>
  );
};

export default CoffeeCardSkeleton;
