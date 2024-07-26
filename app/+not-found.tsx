import Button from "@/components/Button";
import EmptyListAnimation from "@/components/EmptyListAnimation";
import { COLORS } from "@/theme/theme";
import { Link, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-primary-black flex-1">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <View className="flex-1 justify-center">
        <LottieView
          style={{
            width: Dimensions.get("window").width / 2,
            height: Dimensions.get("window").width / 2,
            alignSelf: "center",
          }}
          source={require("@/lottie/404.json")}
          autoPlay
          loop
        />
        <Text className="font-poppins-semibold text-3xl text-primary-white text-center my-4">
          Oops! Page not found.
        </Text>
        <Button onPress={() => router.push("/(tabs)/product")}>
          Go to Home
        </Button>
      </View>
    </SafeAreaView>
  );
}
