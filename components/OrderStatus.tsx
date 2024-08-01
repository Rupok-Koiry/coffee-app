import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GradientIcon from "./GradientIcon";
import { COLORS } from "@/theme/theme";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { type ComponentProps } from "react";

const ANIMATION_DURATION = 500;
const ICON_SIZE = 24;

type OrderStatusProps = {
  currentStatus: string;
};

type IoniconsName = ComponentProps<typeof Ionicons>["name"];

type Status = {
  title: string;
  description: string;
  icon: IoniconsName;
  status: string;
};

const statuses: Status[] = [
  {
    title: "Order Placed",
    description:
      "Your order has been successfully placed and is being processed.",
    icon: "cart",
    status: "PLACED",
  },
  {
    title: "Order Confirmed",
    description: "Your order has been confirmed and will be prepared shortly.",
    icon: "checkmark-circle",
    status: "CONFIRMED",
  },
  {
    title: "On The Way",
    description: "Your order is on its way! It will reach you soon.",
    icon: "bicycle",
    status: "ON_THE_WAY",
  },
  {
    title: "Order Delivered",
    description: "Your order has been delivered. Enjoy your purchase!",
    icon: "home",
    status: "DELIVERED",
  },
];

const getColor = (status: string, currentIndex: number) => {
  const statusOrder = statuses.map((s) => s.status);
  const statusIndex = statusOrder.indexOf(status);
  return statusIndex <= currentIndex
    ? COLORS.primaryOrangeHex
    : COLORS.primaryLightGreyHex;
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

  return (
    <View
      className="w-0.5 h-8 rounded-sm my-3"
      style={{
        backgroundColor: COLORS.primaryLightGreyHex,
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
  const progress = useSharedValue(0);
  const currentIndex = statuses.findIndex((s) => s.status === currentStatus);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: ANIMATION_DURATION, easing: Easing.linear }),
      -1,
      true
    );
  }, [progress]);

  return (
    <View className="flex-col p-5">
      {statuses.map((status, index) => (
        <View key={status.status} className="flex-row items-start">
          <View className="items-center mr-3">
            <GradientIcon
              name={status.icon}
              size={ICON_SIZE}
              color={getColor(status.status, currentIndex)}
              iconSet="Ionicons"
            />
            {index < statuses.length - 1 && (
              <>
                {index === currentIndex ? (
                  <ProgressBar
                    progress={progress}
                    color={COLORS.primaryOrangeHex}
                  />
                ) : (
                  <View
                    className="w-0.5 h-8 rounded-sm my-3"
                    style={{
                      backgroundColor: getColor(
                        statuses[index + 1].status,
                        currentIndex
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
              style={{ color: getColor(status.status, currentIndex) }}
            >
              {status.title}
            </Text>
            <Text className="text-xs text-secondary-light-grey">
              {status.description}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default OrderStatus;
