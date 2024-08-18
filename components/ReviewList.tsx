import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { formatDistanceToNowStrict } from "date-fns";
import { SUPABASE_URL } from "@/services/supabase";
import { Tables } from "@/constants/types";
type ReviewType = Tables<"reviews"> & {
  user: Tables<"profiles">;
};
type ReviewListProps = {
  reviews: ReviewType[];
};

const renderStarIcon = (starNumber: number, rating: number) => {
  const isFilled = rating >= starNumber;
  const isHalfFilled = rating >= starNumber - 0.5 && rating < starNumber;

  return (
    <Ionicons
      key={starNumber}
      name={isFilled ? "star" : isHalfFilled ? "star-half" : "star-outline"}
      size={14}
      color={
        isFilled || isHalfFilled
          ? COLORS.primaryOrangeHex
          : COLORS.primaryLightGreyHex
      }
    />
  );
};

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <FlatList
      scrollEnabled={false}
      data={reviews}
      contentContainerStyle={{ gap: 16 }}
      renderItem={({ item }: { item: ReviewType }) => (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="p-4 rounded-xl mx-5"
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        >
          <View className="flex-row" accessible={true}>
            <Image
              source={{
                uri: `${SUPABASE_URL}/storage/v1/object/public/avatars/${item.user.avatar}`,
              }}
              className="w-12 h-12 rounded-full mr-3"
              accessibilityLabel={`Avatar of ${item.user.full_name}`}
            />
            <View className="flex-1">
              <View className="flex-row justify-between items-center mb-0.5">
                <Text className="font-poppins-semibold text-base text-secondary-light-grey">
                  {item.user.full_name}
                </Text>
                <View className="flex-row items-center space-x-0.5">
                  {[1, 2, 3, 4, 5].map((startNumber) =>
                    renderStarIcon(startNumber, item.rating)
                  )}
                  <Text className="text-xs font-poppins-medium text-primary-white">
                    {item.rating}
                  </Text>
                </View>
              </View>
              <Text className="text-xs font-poppins-regular mb-4 text-secondary-light-grey">
                {formatDistanceToNowStrict(new Date(item.created_at), {
                  addSuffix: true,
                })}
              </Text>
              <Text className="font-poppins-regular text-primary-white">
                {item.comment}
              </Text>
            </View>
          </View>
        </LinearGradient>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default ReviewList;
