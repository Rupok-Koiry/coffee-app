import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { StatusBar, Text, View, Dimensions } from "react-native";
import { useColorScheme } from "nativewind";
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
  const { colorScheme } = useColorScheme();
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors[colorScheme].primaryBackgroundHex,
        flex: 1,
      }}
    >
      <StatusBar backgroundColor={Colors[colorScheme].primaryBackgroundHex} />
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
        <Text className="font-poppins-semibold text-3xl text-primary-text text-center my-4">
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
