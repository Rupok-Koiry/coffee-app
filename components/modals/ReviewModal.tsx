import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/theme/theme";
import Button from "@/components/Button";

type ReviewModalProps = {
  visible: boolean;
  onClose: () => void;
  orderItems: any[];
  reviews: {
    rating: number;
    comment: string;
  }[];
  handleRatingPress: (selectedRating: number, index: number) => void;
  handleCommentChange: (text: string, index: number) => void;
  handleSubmitReview: () => void;
  renderStarIcon: (starNumber: number, rating: number) => JSX.Element | null;
};

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
      <Pressable
        onPress={onClose}
        className="flex-1 bg-primary-black/60 justify-end items-center"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="w-full"
          onStartShouldSetResponder={() => true}
        >
          <LinearGradient
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
            start={[0, 0]}
            end={[1, 1]}
            className="px-5 py-7 rounded-t-3xl w-full"
          >
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-5 right-5 z-20"
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>

            <View className="mb-5">
              <Text className="text-lg font-semibold text-primary-white mb-2 text-center">
                Review {currentItemIndex + 1} of {orderItems.length}
              </Text>
              <View className="w-full h-2 bg-primary-dark-grey rounded-full overflow-hidden">
                <View
                  className="h-full bg-primary-orange rounded-full"
                  style={{ width: `${progressPercentage}%` }}
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
                <Text className="text-xl font-semibold text-primary-white mb-5 text-center">
                  {orderItems[currentItemIndex].product.name}
                </Text>
                <View className="flex-row justify-center mb-5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() => handleRatingPress(i, currentItemIndex)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      className="mr-2"
                    >
                      {renderStarIcon(i, reviews[currentItemIndex].rating)}
                    </TouchableOpacity>
                  ))}
                </View>
                <TextInput
                  className="bg-primary-light-grey p-3 rounded-lg text-primary-white"
                  placeholder="Leave a comment"
                  placeholderTextColor={COLORS.primaryDarkGreyHex}
                  value={reviews[currentItemIndex].comment}
                  onChangeText={(text) =>
                    handleCommentChange(text, currentItemIndex)
                  }
                  multiline
                  textAlignVertical="top"
                  style={{ maxHeight: 120 }}
                />
              </Animated.View>
            )}

            <View className="flex-row justify-between mt-5">
              <TouchableOpacity
                onPress={handlePreviousPress}
                disabled={currentItemIndex === 0}
                className={`p-3 rounded-lg ${
                  currentItemIndex === 0
                    ? "bg-primary-dark-grey"
                    : "bg-primary-orange"
                }`}
              >
                <Text
                  className={`text-primary-white ${
                    currentItemIndex === 0 ? "opacity-50" : "opacity-100"
                  }`}
                >
                  Previous
                </Text>
              </TouchableOpacity>

              {currentItemIndex === orderItems.length - 1 ? (
                <Button onPress={handleSubmitReview}>Submit</Button>
              ) : (
                <Button onPress={handleNextPress}>Next</Button>
              )}
            </View>
          </LinearGradient>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};
export default ReviewModal;
