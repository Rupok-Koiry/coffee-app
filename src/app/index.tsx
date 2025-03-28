import React, { useEffect } from "react";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";

const Index = () => {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.replace("/(tabs)/product");
    }, 50);
    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors[colorScheme].primaryBackgroundHex,
        flex: 1,
      }}
    >
      <Image
        source={require("@/assets/images/splash.png")}
        className="w-full h-full"
      />
    </SafeAreaView>
  );
};

export default Index;
