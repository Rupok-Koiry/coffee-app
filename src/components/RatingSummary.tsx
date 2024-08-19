import React from "react";
import { useColorScheme } from "nativewind";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type RatingSummaryProps = {
  reviews: {
    rating: number;
  }[];
};

const calculateRatingSummary = (
  reviews: {
    rating: number;
  }[]
) => {
  const totalReviews = reviews.length;

  if (totalReviews === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      ratingDistribution: [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: 0,
      })),
    };
  }

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((review) => Math.round(review.rating) === star)
      .length,
  }));

  return { totalReviews, averageRating, ratingDistribution };
};

const RatingSummary: React.FC<RatingSummaryProps> = ({ reviews }) => {
  const { totalReviews, averageRating, ratingDistribution } =
    calculateRatingSummary(reviews);
  const { colorScheme } = useColorScheme();
  return (
    <View className="p-5 flex-row items-center" style={{ gap: 20 }}>
      <View>
        <Text className="text-6xl font-poppins-semibold text-primary-text text-center py-2">
          {averageRating.toFixed(1)}
        </Text>
        <Text className="text-secondary-text text-center -mt-3">
          {totalReviews} {totalReviews === 1 ? "rating" : "ratings"}
        </Text>
      </View>
      <View className="flex-col flex-1">
        {ratingDistribution.map(({ star, count }, index) => (
          <View key={index} className="flex-row items-center my-0.5">
            <Ionicons
              name="star"
              size={20}
              color={Colors[colorScheme].primaryOrangeHex}
            />
            <Text className="ml-2 text-base font-poppins-regular text-secondary-text">
              {star}
            </Text>
            <View className="h-2 bg-secondary-background rounded-full flex-1 mx-3">
              <View
                className="h-full bg-primary-orange rounded-full"
                style={{
                  width: count > 0 ? `${(count / totalReviews) * 100}%` : "0%",
                }}
              />
            </View>
            <Text className="font-poppins-regular text-primary-text">
              {count}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default RatingSummary;
