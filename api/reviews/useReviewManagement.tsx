import { useState, useEffect, useCallback } from "react";
import * as Haptics from "expo-haptics";
import { useUser } from "@/api/auth/useUser";
import { useReviewEligibility } from "@/api/reviews/useReviewEligibility";
import { useCreateReviews } from "@/api/reviews/useCreateReviews";
import { useOrderReviews } from "@/api/reviews/useOrderReviews";
import { useUpdateReviews } from "@/api/reviews/useUpdateReviews";
import { COLORS } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { TransformedOrder } from "@/services/apiOrders";
import { InsertTables, Tables } from "@/constants/types";

export const useReviewManagement = (order?: TransformedOrder | null) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [reviews, setReviews] = useState<InsertTables<"reviews">[]>([]);
  const { user } = useUser();
  const { isEligible } = useReviewEligibility();
  const { createReviews, isCreating } = useCreateReviews();
  const { reviews: orderReviews } = useOrderReviews();
  const { updateReviews, isUpdating } = useUpdateReviews();

  useEffect(() => {
    if (order && user && isEligible) {
      setReviews(
        order.order_items.map((_, i) => ({
          rating: 0,
          comment: null,
          user_id: user.id,
          product_id: order.order_items[i].product_id,
          order_id: order.id,
        }))
      );
    }
    if (order && user && !isEligible && orderReviews) {
      setReviews(orderReviews);
    }
  }, [order, user, isEligible, orderReviews]);

  const handleRatingPress = useCallback(
    (selectedRating: number, index: number) => {
      setReviews((prevReviews) => {
        const updatedReviews = [...prevReviews];
        if (updatedReviews[index].rating === selectedRating) {
          updatedReviews[index].rating = selectedRating - 0.5;
        } else {
          updatedReviews[index].rating = selectedRating;
        }
        return updatedReviews;
      });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    },
    []
  );

  const handleCommentChange = useCallback((text: string, index: number) => {
    setReviews((prevReviews) => {
      const updatedReviews = [...prevReviews];
      updatedReviews[index].comment = text;
      return updatedReviews;
    });
  }, []);

  const handleSubmitReview = useCallback(() => {
    if (isEligible) {
      createReviews(reviews, {
        onSettled: () => {
          setModalVisible(false);
        },
      });
    } else {
      updateReviews(reviews as Tables<"reviews">[], {
        onSettled: () => {
          setModalVisible(false);
        },
      });
    }
  }, [reviews, isEligible, createReviews, updateReviews]);

  const renderStarIcon = useCallback((starNumber: number, rating: number) => {
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
  }, []);

  return {
    reviews,
    modalVisible,
    isEligible,
    handleRatingPress,
    handleCommentChange,
    handleSubmitReview,
    setModalVisible,
    renderStarIcon,
    isCreatingOrUpdating: isCreating || isUpdating,
  };
};
