import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const ProfileScreen = () => {
  return (
    <SafeAreaView>
      <Text className="text-5xl text-red-500">ProfileScreen</Text>
      <Link href="/profile/favorite">Favorite</Link>
    </SafeAreaView>
  );
};

export default ProfileScreen;
