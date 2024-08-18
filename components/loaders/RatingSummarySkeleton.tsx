import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";

const ReviewSummarySkeleton: React.FC = () => {
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
    <View className="p-5 flex-row items-center" style={{ gap: 20 }}>
      <View>
        <Animated.View
          className="w-28 h-28 rounded-full bg-primary-grey mb-2 animate-pulse"
          style={{ opacity: pulseAnim }}
        />
        <Animated.View
          className="w-16 h-3 mx-auto rounded bg-primary-grey animate-pulse"
          style={{ opacity: pulseAnim }}
        />
      </View>
      <View className="flex-col flex-1">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <Animated.View
            key={index}
            className="flex-row items-center my-0.5"
            style={{ opacity: pulseAnim }}
          >
            <Animated.View
              className="w-5 h-5 rounded-full bg-primary-grey mr-2 animate-pulse"
              style={{ opacity: pulseAnim }}
            />
            <Animated.View
              className="h-2 bg-primary-dark-grey rounded-full flex-1 mx-3 animate-pulse"
              style={{ opacity: pulseAnim }}
            />
            <Animated.View
              className="w-6 h-4 rounded bg-primary-grey animate-pulse"
              style={{ opacity: pulseAnim }}
            />
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

export default ReviewSummarySkeleton;
