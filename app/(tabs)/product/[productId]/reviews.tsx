import HeaderBar from "@/components/HeaderBar";
import RatingSummary from "@/components/RatingSummary";
import ReviewList from "@/components/ReviewList";
import { Colors } from "@/constants/Colors";
import React from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useReviews } from "@/hooks/reviews/useReviews";
import { Tables } from "@/constants/types";
import ReviewSummarySkeleton from "@/components/loaders/RatingSummarySkeleton";
import ReviewCardSkeleton from "@/components/loaders/ReviewCardSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import { useColorScheme } from "nativewind";
type ReviewType = Tables<"reviews"> & {
  user: Tables<"profiles">;
};
const ReviewsScreen = () => {
  const { colorScheme } = useColorScheme();
  const { productId } = useLocalSearchParams();
  const { reviews, isLoading, error } = useReviews();

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <SafeAreaView className="bg-primary-black flex-1">
      <StatusBar backgroundColor={Colors[colorScheme].primaryBackgroundHex} />
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
