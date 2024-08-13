import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { COLORS } from "@/theme/theme";
import HeaderBar from "@/components/HeaderBar";
import OrderHistoryCard from "@/components/OrderCard";
import OrderStatus from "@/components/OrderStatus";
import Loader from "@/components/loader/Loader";
import NotFound from "@/components/loader/NotFound";
import Button from "@/components/Button";
import { useOrder } from "@/api/orders/useOrder";
import { useUpdateOrderSubscription } from "@/services/apiSubscriptions";
import { useLocalSearchParams } from "expo-router";
import ReviewModal from "@/components/modals/ReviewModal";

interface Review {
  rating: number;
  comment: string;
}

const OrderDetailsScreen: React.FC = () => {
  const { orderId } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const { order, isLoading } = useOrder();

  useUpdateOrderSubscription(
    Array.isArray(orderId) ? Number(orderId[0]) : Number(orderId)
  );

  useEffect(() => {
    if (order?.status === "DELIVERED") {
      console.log("Order delivered");
    }

    if (order?.order_items) {
      setReviews(order.order_items.map(() => ({ rating: 0, comment: "" })));
    }
  }, [order]);

  const handleRatingPress = (selectedRating: number, index: number) => {
    const updatedReviews = [...reviews];
    if (updatedReviews[index].rating === selectedRating) {
      updatedReviews[index].rating = selectedRating - 0.5;
    } else {
      updatedReviews[index].rating = selectedRating;
    }

    setReviews(updatedReviews);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleCommentChange = (text: string, index: number) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].comment = text;

    setReviews(updatedReviews);
  };

  const renderStarIcon = (starNumber: number, rating: number) => {
    const isFilled = rating >= starNumber;
    const isHalfFilled = rating >= starNumber - 0.5 && rating < starNumber;

    return (
      <Ionicons
        name={isFilled ? "star" : isHalfFilled ? "star-half" : "star-outline"}
        size={32}
        color={
          isFilled || isHalfFilled
            ? COLORS.primaryOrangeHex
            : COLORS.primaryLightGreyHex
        }
      />
    );
  };

  const handleSubmitReview = () => {
    const incompleteReview = reviews.find((review) => review.rating === 0);
    if (incompleteReview) {
      Alert.alert(
        "Incomplete Review",
        "Please rate all products before submitting."
      );
      return;
    }
    console.log("Reviews submitted:", reviews);
    setModalVisible(false);
  };

  if (isLoading) return <Loader />;
  if (!order) {
    return (
      <NotFound
        message="Order not found!"
        redirectTo="/(tabs)/order"
        label="Go Back"
        goBack
      />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-black">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderBar title="Order History" />
        <View className="flex-1 px-5" style={{ gap: 32 }}>
          <OrderStatus currentStatus={order.status} />
          <OrderHistoryCard
            key={order.id}
            navigationHandler={() => {}}
            order_id={order.id}
            order_items={order.order_items}
            total_price={order.total_price}
            order_date={order.order_date}
          />
          <Button onPress={() => setModalVisible(true)}>Review Order</Button>
        </View>
      </ScrollView>

      <ReviewModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        orderItems={order.order_items}
        reviews={reviews}
        handleRatingPress={handleRatingPress}
        handleCommentChange={handleCommentChange}
        handleSubmitReview={handleSubmitReview}
        renderStarIcon={renderStarIcon}
      />
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;
