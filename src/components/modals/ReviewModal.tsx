import React, { useEffect, useState, useRef } from "react";
import { useColorScheme } from "nativewind";
import {
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { InsertTables } from "@/constants/types";
import Toast from "react-native-toast-message";

type ReviewModalProps = {
  visible: boolean;
  onClose: () => void;
  orderItems: any[];
  reviews: InsertTables<"reviews">[];
  isCreatingOrUpdating: boolean;
  handleRatingPress: (selectedRating: number, index: number) => void;
  handleCommentChange: (text: string, index: number) => void;
  handleSubmitReview: () => void;
  renderStarIcon: (starNumber: number, rating: number) => JSX.Element;
};

const ReviewModal: React.FC<ReviewModalProps> = ({
  visible,
  onClose,
  orderItems,
  reviews,
  isCreatingOrUpdating,
  handleRatingPress,
  handleCommentChange,
  handleSubmitReview,
  renderStarIcon,
}) => {
  const { colorScheme } = useColorScheme();
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [navigationDirection, setNavigationDirection] = useState<
    "next" | "previous"
  >("next");

  useEffect(() => {
    if (visible) {
      setCurrentItemIndex(0);
      progressAnim.setValue(0);
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

    const progressPercentage = (currentItemIndex / orderItems.length) * 100;

    Animated.timing(progressAnim, {
      toValue: progressPercentage,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [
    currentItemIndex,
    navigationDirection,
    opacityAnim,
    slideAnim,
    orderItems.length,
    progressAnim,
  ]);

  const handleNextPress = () => {
    if (reviews[currentItemIndex].rating === 0) {
      Toast.show({
        type: "error",
        text1: "Please select a rating",
      });
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

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        className="flex-1 bg-primary-background/60 justify-end items-center"
      >
        <LinearGradient
          colors={[
            Colors[colorScheme].secondaryGreyHex,
            Colors[colorScheme].primaryBackgroundHex,
          ]}
          start={[0, 0]}
          end={[1, 1]}
          className="p-5 w-full"
          onStartShouldSetResponder={() => true}
          style={{ borderRadius: 16 }}
        >
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-5 right-5 z-20"
          >
            <Ionicons
              name="close"
              size={24}
              color={Colors[colorScheme].primaryOrangeHex}
            />
          </TouchableOpacity>

          <View className="mb-3">
            <Text className="text-sm font-poppins-regular text-secondary-text mb-2 text-center">
              Review {currentItemIndex + 1} of {orderItems.length}
            </Text>
            <View className="w-full h-2 bg-secondary-background rounded-full overflow-hidden">
              <Animated.View
                className="h-full bg-primary-orange rounded-full"
                style={{
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ["0%", "100%"],
                  }),
                }}
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
              <Text className="text-xl font-poppins-semibold text-primary-text mb-3 text-center">
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
                    {renderStarIcon(i, reviews[currentItemIndex]?.rating)}
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                placeholder="Leave a comment"
                value={reviews[currentItemIndex]?.comment as string}
                onChangeText={(text) =>
                  handleCommentChange(text, currentItemIndex)
                }
                multiline
                textAlignVertical="top"
                numberOfLines={4}
                className="mb-3 rounded-xl bg-secondary-background border border-primary-grey font-poppins-medium text-sm text-primary-text p-3"
                placeholderTextColor={Colors[colorScheme].accentTextHex}
                cursorColor={Colors[colorScheme].primaryOrangeHex}
              />
            </Animated.View>
          )}

          <View className="flex-row justify-between mt-0">
            <Button
              containerClassName="py-2"
              onPress={handlePreviousPress}
              outline
              disabled={currentItemIndex === 0}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={
                  currentItemIndex === 0
                    ? Colors[colorScheme].secondaryGreyHex
                    : Colors[colorScheme].primaryOrangeHex
                }
              />
            </Button>

            {currentItemIndex === orderItems.length - 1 ? (
              <Button
                containerClassName="py-2"
                onPress={handleSubmitReview}
                disabled={isCreatingOrUpdating}
                loading={isCreatingOrUpdating}
              >
                Submit
              </Button>
            ) : (
              <Button
                containerClassName="py-2"
                onPress={handleNextPress}
                outline
              >
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={Colors[colorScheme].primaryOrangeHex}
                />
              </Button>
            )}
          </View>
        </LinearGradient>
      </Pressable>
    </Modal>
  );
};

export default ReviewModal;
