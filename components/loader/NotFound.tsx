import Button from "@/components/Button";
import { COLORS } from "@/theme/theme";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { StatusBar, Text, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NotFoundProps = {
  message: string;
  redirectTo?: string;
  label?: string;
  goBack?: boolean;
};

export default function NotFound({
  message,
  redirectTo = "/",
  label = "Go to Home",
  goBack = false,
}: NotFoundProps) {
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
          {message}
        </Text>
        <Button
          containerClassName="self-center"
          onPress={() => {
            if (goBack) router.back();
            else router.push(redirectTo);
          }}
        >
          {label}
        </Button>
      </View>
    </SafeAreaView>
  );
}
