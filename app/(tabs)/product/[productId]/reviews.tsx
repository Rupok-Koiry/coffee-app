import HeaderBar from "@/components/HeaderBar";
import RatingSummary from "@/components/RatingSummary";
import ReviewList from "@/components/ReviewList";
import { COLORS } from "@/theme/theme";
import React from "react";
import { ScrollView, StatusBar, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useReviews } from "@/api/reviews/useReviews";
import { Tables } from "@/constants/types";
import ReviewSummarySkeleton from "@/components/loader/RatingSummarySkeleton";
import ReviewCardSkeleton from "@/components/loader/ReviewCardSkeleton";
type ReviewType = Tables<"reviews"> & {
  user: Tables<"profiles">;
};
const ReviewsScreen = () => {
  const { productId } = useLocalSearchParams();
  const { reviews, isLoading, error } = useReviews();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  if (!reviews?.length) {
    return <Text>No reviews found</Text>;
  }
  // console.log(reviews[0].user);

  return (
    <SafeAreaView className="bg-primary-black flex-1">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView>
        <HeaderBar title={`Review of ${productId}`} />
        <RatingSummary reviews={reviews} />
        <ReviewSummarySkeleton />
        <ReviewList reviews={reviews as ReviewType[]} />
        <ReviewCardSkeleton />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewsScreen;
