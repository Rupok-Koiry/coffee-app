import React, { useEffect, useRef } from "react";
import { View, Dimensions, Animated } from "react-native";
import { useColorScheme } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";

const SearchCardSkeleton: React.FC = () => {
  const { colorScheme } = useColorScheme();
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
      colors={[
        Colors[colorScheme].secondaryGreyHex,
        Colors[colorScheme].primaryBackgroundHex,
      ]}
      className="p-3 rounded-2xl"
      style={{ flex: 1 }}
    >
      <View className="flex-row flex-1">
        <Animated.View
          className="w-32 h-32 rounded-xl bg-primary-background animate-pulse"
          style={{ opacity: pulseAnim }}
        />
        <View className="flex-1 py-1 justify-between ml-5">
          <View>
            <Animated.View
              className="h-3 w-3/4 rounded bg-primary-grey mb-2 animate-pulse"
              style={{ opacity: pulseAnim }}
            />
            <Animated.View
              className="h-3 w-3/4 rounded bg-primary-grey animate-pulse"
              style={{ opacity: pulseAnim }}
            />
          </View>
          <View className="flex-row justify-between items-center mt-4">
            <Animated.View
              className="h-5 w-16 rounded bg-primary-grey animate-pulse"
              style={{ opacity: pulseAnim }}
            />
            <Animated.View
              className="h-8 w-8 justify-center items-center rounded-lg bg-primary-orange animate-pulse"
              style={{ opacity: pulseAnim }}
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SearchCardSkeleton;
