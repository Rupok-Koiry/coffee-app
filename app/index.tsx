import React, { useState, useCallback } from "react";
import { View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Button from "@/components/Button";
import SignInBottomSheet from "@/components/SignInBottomSheet";

const SignInScreen = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handlePresentModalPress = useCallback(() => {
    setIsBottomSheetVisible(true);
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    setIsBottomSheetVisible(false);
  }, []);

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-black">
        <Link href="/(auth)/sign-in" className="text-2xl text-primary-red mb-5">
          Auth
        </Link>
        <Link href="/(tabs)/product" className="text-2xl text-primary-red mb-5">
          App
        </Link>
        <View className="flex-1 justify-center p-6 bg-primary-dark-grey">
          <Button onPress={handlePresentModalPress}>Press</Button>
          <SignInBottomSheet
            isVisible={isBottomSheetVisible}
            onClose={handleCloseBottomSheet}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default SignInScreen;
