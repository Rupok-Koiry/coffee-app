import React, { useEffect, useRef } from "react";
import { View, Dimensions, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/theme/theme";

const ReviewCardSkeleton: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.8,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      className="p-4 rounded-xl mx-5"
    >
      <View className="flex-row items-center mb-4">
        <Animated.View
          className="w-12 h-12 rounded-full bg-primary-grey mr-3 animate-pulse"
          style={{ opacity: pulseAnim }}
        />
        <View className="flex-1">
          <Animated.View
            className="h-3 w-3/5 rounded bg-primary-grey mb-2 animate-pulse"
            style={{ opacity: pulseAnim }}
          />
          <Animated.View
            className="h-2 w-2/5 rounded bg-primary-grey animate-pulse"
            style={{ opacity: pulseAnim }}
          />
        </View>
      </View>

      <Animated.View
        className="h-3 w-2/5 rounded bg-primary-grey mb-3 animate-pulse"
        style={{ opacity: pulseAnim }}
      />
      <Animated.View
        className="h-3 w-full rounded bg-primary-grey mb-2 animate-pulse"
        style={{ opacity: pulseAnim }}
      />
      <Animated.View
        className="h-3 w-4/5 rounded bg-primary-grey animate-pulse"
        style={{ opacity: pulseAnim }}
      />
    </LinearGradient>
  );
};

export default ReviewCardSkeleton;
