import React, { useEffect } from "react";
import { useColorScheme } from "nativewind";
import { View, Text, ColorSchemeName } from "react-native";
import GradientIcon from "./GradientIcon";
import { Colors } from "@/constants/Colors";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Enums, orderStatuses } from "@/constants/types";

const ANIMATION_DURATION = 500;
const ICON_SIZE = 24;

type OrderStatusProps = {
  currentStatus: Enums<"order_status_enum">;
};

const getColor = (
  status: Enums<"order_status_enum">,
  currentIndex: number,
  colorScheme: ColorSchemeName
) => {
  const statusOrder = orderStatuses.map((s) => s.status);
  const statusIndex = statusOrder.indexOf(status);
  return statusIndex <= currentIndex
    ? Colors[colorScheme].primaryOrangeHex
    : Colors[colorScheme].accentTextHex;
};

const ProgressBar = ({
  progress,
  color,
}: {
  progress: Animated.SharedValue<number>;
  color: string;
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    height: `${progress.value * 100}%`,
  }));
  const { colorScheme } = useColorScheme();

  return (
    <View
      className="w-0.5 h-8 rounded-sm my-3"
      style={{
        backgroundColor: Colors[colorScheme].accentTextHex,
      }}
    >
      <Animated.View
        className="rounded-sm w-full"
        style={[
          {
            backgroundColor: color,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};

const OrderStatus = ({ currentStatus }: OrderStatusProps) => {
  const { colorScheme } = useColorScheme();
  const progress = useSharedValue(0);
  const currentIndex = orderStatuses.findIndex(
    (s) => s.status === currentStatus
  );

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: ANIMATION_DURATION, easing: Easing.linear }),
      -1,
      true
    );
  }, [progress]);

  return (
    <View className="flex-col p-5">
      {orderStatuses.map((status, index) => (
        <View key={status.status} className="flex-row items-start">
          <View className="items-center mr-3">
            <GradientIcon
              name={status.icon}
              size={ICON_SIZE}
              color={getColor(status.status, currentIndex, colorScheme)}
              iconSet="Ionicons"
            />
            {index < orderStatuses.length - 1 && (
              <>
                {index === currentIndex ? (
                  <ProgressBar
                    progress={progress}
                    color={Colors[colorScheme].primaryOrangeHex}
                  />
                ) : (
                  <View
                    className="w-0.5 h-8 rounded-sm my-3"
                    style={{
                      backgroundColor: getColor(
                        orderStatuses[index + 1].status,
                        currentIndex,
                        colorScheme
                      ),
                    }}
                  />
                )}
              </>
            )}
          </View>
          <View className="flex-1">
            <Text
              className="text-base font-poppins-semibold"
              style={{
                color: getColor(status.status, currentIndex, colorScheme),
              }}
            >
              {status.title}
            </Text>
            <Text className="text-xs text-secondary-text">
              {status.description}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default OrderStatus;
