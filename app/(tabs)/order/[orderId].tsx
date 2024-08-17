import React, { useEffect, useCallback } from "react";
import { ScrollView, StatusBar, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import { COLORS } from "@/theme/theme";
import HeaderBar from "@/components/HeaderBar";
import OrderHistoryCard from "@/components/OrderCard";
import OrderStatus from "@/components/OrderStatus";
import Loader from "@/components/loaders/Loader";
import NotFound from "@/components/loaders/NotFound";
import Button from "@/components/Button";
import ReviewModal from "@/components/modals/ReviewModal";
import { useOrder } from "@/hooks/orders/useOrder";
import { useUpdateOrderSubscription } from "@/services/apiSubscriptions";
import { useReviewManagement } from "@/hooks/reviews/useReviewManagement";
import ErrorMessage from "@/components/ErrorMessage";

const OrderDetailsScreen: React.FC = () => {
  const { orderId } = useLocalSearchParams();
  const { order, isLoading, error } = useOrder();
  useUpdateOrderSubscription(
    Array.isArray(orderId) ? Number(orderId[0]) : Number(orderId)
  );
  const {
    reviews,
    modalVisible,
    isEligible,
    handleRatingPress,
    handleCommentChange,
    handleSubmitReview,
    setModalVisible,
    renderStarIcon,
    isCreatingOrUpdating,
  } = useReviewManagement(order);
  const handleReviewPress = useCallback(() => {
    setModalVisible(true);
  }, [reviews, setModalVisible]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primaryBlackHex }}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderBar title="Order History" />
        <OrderStatus currentStatus={order.status} />
        <View style={{ flex: 1, paddingHorizontal: 20, gap: 32 }}>
          <OrderHistoryCard
            key={order.id}
            navigationHandler={() => {}}
            order_id={order.id}
            order_items={order.order_items}
            total_price={order.total_price}
            order_date={order.order_date}
          />
          {order.status === "DELIVERED" && (
            <Button onPress={handleReviewPress}>
              {isEligible ? "Review Order" : "Edit Review"}
            </Button>
          )}
        </View>
      </ScrollView>

      <ReviewModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        orderItems={order.order_items}
        reviews={reviews}
        isCreatingOrUpdating={isCreatingOrUpdating}
        handleRatingPress={handleRatingPress}
        handleCommentChange={handleCommentChange}
        handleSubmitReview={handleSubmitReview}
        renderStarIcon={renderStarIcon}
      />
    </SafeAreaView>
  );
};

export default React.memo(OrderDetailsScreen);
