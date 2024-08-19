import React, { useEffect, useRef } from "react";
import { View, Dimensions, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";

const CARD_WIDTH = Dimensions.get("window").width * 0.32;

const CoffeeCardSkeleton: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const { colorScheme } = useColorScheme();
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
      colors={[
        Colors[colorScheme].secondaryGreyHex,
        Colors[colorScheme].primaryBackgroundHex,
      ]}
      className="p-3 rounded-2xl"
    >
      <Animated.View
        className="w-full h-full rounded-2xl mb-4 overflow-hidden bg-primary-background animate-pulse"
        style={{ width: CARD_WIDTH, height: CARD_WIDTH, opacity: pulseAnim }}
      />
      <Animated.View
        className="h-3 w-full rounded bg-primary-grey mb-2 animate-pulse"
        style={{ opacity: pulseAnim }}
      />
      <Animated.View
        className="h-3 w-full rounded bg-primary-grey mb-2 animate-pulse"
        style={{ opacity: pulseAnim }}
      />
      <Animated.View
        className="flex-row justify-between items-center mt-4"
        style={{ opacity: pulseAnim }}
      >
        <Animated.View
          className="h-5 w-12 rounded bg-primary-grey animate-pulse"
          style={{ opacity: pulseAnim }}
        />
        <Animated.View
          className="h-8 w-8 justify-center items-center rounded-lg bg-primary-orange animate-pulse"
          style={{ opacity: pulseAnim }}
        />
      </Animated.View>
    </LinearGradient>
  );
};

export default CoffeeCardSkeleton;
