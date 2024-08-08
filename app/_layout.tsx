import "react-native-reanimated";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Provider } from "react-redux";
import store from "@/features/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast, {
  BaseToast,
  ToastConfig,
  ToastConfigParams,
} from "react-native-toast-message";
import { COLORS } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const toastConfig: ToastConfig = {
  error: ({ text1 = "", text2 = "", props }: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: COLORS.primaryRedHex,
        backgroundColor: COLORS.primaryDarkGreyHex,
        marginBottom: 32,
      }}
      contentContainerStyle={{
        paddingHorizontal: 0,
      }}
      text1Style={{
        color: COLORS.secondaryLightGreyHex,
        fontSize: 16,
        fontWeight: 500,
      }}
      text2Style={{ color: COLORS.primaryWhiteHex }}
      text1={text1}
      text2={text2}
      renderLeadingIcon={() => (
        <View className="flex-row justify-center items-center bg-primary-dark-grey p-2">
          <Ionicons
            name="close-circle"
            size={24}
            color={COLORS.primaryRedHex}
          />
        </View>
      )}
    />
  ),
  success: ({ text1 = "", text2 = "", props }: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: COLORS.successGreenHex,
        marginBottom: 32,
        backgroundColor: COLORS.primaryDarkGreyHex,
      }}
      contentContainerStyle={{
        paddingHorizontal: 0,
      }}
      text1Style={{
        color: COLORS.secondaryLightGreyHex,
        fontSize: 16,
        fontWeight: 500,
      }}
      text2Style={{ color: COLORS.primaryWhiteHex }}
      text1={text1}
      text2={text2}
      renderLeadingIcon={() => (
        <View className="flex-row justify-center items-center bg-primary-dark-grey p-2">
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={COLORS.successGreenHex}
          />
        </View>
      )}
    />
  ),
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StripeProvider
        publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""}
      >
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen
                name="+not-found"
                options={{ headerShown: false }}
              />
            </Stack>
          </Provider>
        </QueryClientProvider>
        <Toast config={toastConfig} position="bottom" />
      </StripeProvider>
    </ThemeProvider>
  );
}
