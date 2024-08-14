import HeaderBar from "@/components/HeaderBar";
import RatingSummary from "@/components/RatingSummary";
import ReviewList from "@/components/ReviewList";
import { COLORS } from "@/theme/theme";
import React from "react";
import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ReviewsScreen = () => {
  return (
    <SafeAreaView className="bg-primary-black flex-1">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView>
        <HeaderBar title="Review of Americano" />
        <RatingSummary />
        <ReviewList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewsScreen;
