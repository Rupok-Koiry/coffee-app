import { Href, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import {
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
type ButtonProps = {
  href?: Href<string>;
  onPress?: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  outline?: boolean;
  containerClassName?: string;
  textClassName?: string;
  disabled?: boolean;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  href,
  onPress,
  children,
  outline = false,
  disabled = false,
  loading = false,
  containerClassName = "",
  textClassName = "",
}) => {
  const router = useRouter();
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const { colorScheme } = useColorScheme();
  React.useEffect(() => {
    if (loading) {
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 800,
          easing: Easing.linear,
        }),
        -1
      );
      scale.value = withRepeat(
        withTiming(1.2, {
          duration: 800,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      );
    } else {
      rotation.value = 0;
      scale.value = 1;
    }
  }, [loading]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
    };
  });

  const handlePress = (event: GestureResponderEvent) => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (href) {
      router.push(href);
    } else if (onPress) {
      onPress(event);
    }
  };

  return (
    <TouchableOpacity
      className={`justify-center items-center rounded-xl px-5 py-3 ${
        outline
          ? `border-2 ${
              disabled
                ? "border-primary-grey bg-secondary-background"
                : "border-primary-orange"
            }`
          : `${disabled ? "bg-primary-grey" : "bg-primary-orange"}`
      } ${containerClassName}`}
      onPress={handlePress}
      activeOpacity={disabled ? 1 : 0.8}
      disabled={disabled}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {loading ? (
          <Animated.View style={[{ marginLeft: 8 }, animatedStyle]}>
            <FontAwesome5
              name="spinner"
              size={24}
              color={Colors[colorScheme].primaryTextHex}
            />
          </Animated.View>
        ) : (
          <Text
            className={`font-poppins-regular text-base ${
              disabled ? "text-secondary-background" : "text-primary-text"
            } ${textClassName}`}
          >
            {children}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
