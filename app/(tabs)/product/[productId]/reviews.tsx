import HeaderBar from "@/components/HeaderBar";
import RatingSummary from "@/components/RatingSummary";
import ReviewList from "@/components/ReviewList";
import { COLORS } from "@/theme/theme";
import React from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useReviews } from "@/hooks/reviews/useReviews";
import { Tables } from "@/constants/types";
import ReviewSummarySkeleton from "@/components/loader/RatingSummarySkeleton";
import ReviewCardSkeleton from "@/components/loader/ReviewCardSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
type ReviewType = Tables<"reviews"> & {
  user: Tables<"profiles">;
};
const ReviewsScreen = () => {
  const { productId } = useLocalSearchParams();
  const { reviews, isLoading, error } = useReviews();

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <SafeAreaView className="bg-primary-black flex-1">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView>
        <HeaderBar title={`Review of ${productId}`} />
        {isLoading ? (
          <View>
            <ReviewSummarySkeleton />
            <View style={{ gap: 16 }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <ReviewCardSkeleton key={i} />
              ))}
            </View>
          </View>
        ) : (
          <View>
            <RatingSummary reviews={reviews as ReviewType[]} />
            <ReviewList reviews={reviews as ReviewType[]} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewsScreen;
