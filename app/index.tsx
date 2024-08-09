import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useUser } from "@/api/auth/useUser";

const SignInScreen = () => {
  return (
    <SafeAreaView>
      <Link href="/(auth)/sign-in" className="text-5xl text-red-500 mb-5">
        Auth
      </Link>
      <Link href="/(tabs)/product" className="text-5xl text-red-500 ">
        App
      </Link>
    </SafeAreaView>
  );
};

export default SignInScreen;
