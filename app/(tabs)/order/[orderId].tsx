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
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
  StyleSheet,
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

interface Review {
  rating: number;
  comment: string;
}

const OrderDetailsScreen: React.FC = () => {
  const { orderId } = useLocalSearchParams() as { orderId: string | string[] };
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

interface ReviewModalProps {
  visible: boolean;
  onClose: () => void;
  orderItems: any[];
  reviews: Review[];
  handleRatingPress: (selectedRating: number, index: number) => void;
  handleCommentChange: (text: string, index: number) => void;
  handleSubmitReview: () => void;
  renderStarIcon: (starNumber: number, rating: number) => JSX.Element | null;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  visible,
  onClose,
  orderItems,
  reviews,
  handleRatingPress,
  handleCommentChange,
  handleSubmitReview,
  renderStarIcon,
}) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [navigationDirection, setNavigationDirection] = useState<
    "next" | "previous"
  >("next");

  useEffect(() => {
    if (visible) {
      setCurrentItemIndex(0);
    }
  }, [visible]);

  useEffect(() => {
    opacityAnim.setValue(0);
    slideAnim.setValue(navigationDirection === "next" ? 50 : -50);

    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentItemIndex, navigationDirection, opacityAnim, slideAnim]);

  const handleNextPress = () => {
    if (reviews[currentItemIndex].rating === 0) {
      Alert.alert(
        "Incomplete Review",
        "Please rate the product before proceeding."
      );
      return;
    }
    if (currentItemIndex < orderItems.length - 1) {
      setNavigationDirection("next");
      setCurrentItemIndex(currentItemIndex + 1);
    }
  };

  const handlePreviousPress = () => {
    if (currentItemIndex > 0) {
      setNavigationDirection("previous");
      setCurrentItemIndex(currentItemIndex - 1);
    }
  };

  const progressPercentage = ((currentItemIndex + 1) / orderItems.length) * 100;

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable onPress={onClose} style={styles.modalOverlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ width: "100%" }}
          onStartShouldSetResponder={() => true}
        >
          <LinearGradient
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.modalContainer}
          >
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                Review {currentItemIndex + 1} of {orderItems.length}
              </Text>
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${progressPercentage}%` },
                  ]}
                />
              </View>
            </View>

            {orderItems[currentItemIndex] && (
              <Animated.View
                style={{
                  opacity: opacityAnim,
                  transform: [{ translateX: slideAnim }],
                }}
              >
                <Text style={styles.productName}>
                  {orderItems[currentItemIndex].product.name}
                </Text>
                <View style={styles.starsContainer}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() => handleRatingPress(i, currentItemIndex)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      {renderStarIcon(
                        i,
                        reviews[currentItemIndex]?.rating || 0
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
                <TextInput
                  placeholder="Leave a comment..."
                  multiline={true}
                  numberOfLines={4}
                  style={styles.commentInput}
                  value={reviews[currentItemIndex]?.comment}
                  onChangeText={(text) =>
                    handleCommentChange(text, currentItemIndex)
                  }
                  placeholderTextColor={COLORS.primaryLightGreyHex}
                  cursorColor={COLORS.primaryOrangeHex}
                />

                <View style={styles.navigationButtonsContainer}>
                  <Button
                    onPress={handlePreviousPress}
                    disabled={currentItemIndex === 0}
                  >
                    Previous
                  </Button>
                  {currentItemIndex < orderItems.length - 1 ? (
                    <Button onPress={handleNextPress}>Next</Button>
                  ) : (
                    <Button onPress={handleSubmitReview}>Submit</Button>
                  )}
                </View>
              </Animated.View>
            )}
          </LinearGradient>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackRGBA, // Assuming this is defined in COLORS
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: COLORS.primaryWhiteHex,
    marginBottom: 10,
    textAlign: "center",
  },
  progressBarBackground: {
    width: "100%",
    height: 10,
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: 5,
  },
  productName: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: COLORS.primaryWhiteHex,
    marginBottom: 20,
    textAlign: "center",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  commentInput: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: COLORS.primaryWhiteHex,
    padding: 15,
    marginBottom: 25,
    borderRadius: 15,
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderWidth: 1,
    borderColor: COLORS.primaryGreyHex,
    textAlignVertical: "top",
  },
  navigationButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default OrderDetailsScreen;
