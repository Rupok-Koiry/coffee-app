import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const ProfileScreen = () => {
  return (
    <SafeAreaView>
      <Text className="text-5xl text-red-500">ProfileScreen</Text>
      <Link href="/profile/favorite" className="text-white">
        Favorite
      </Link>
      <Link href="/profile/fav22orite" className="text-white">
        Not Found22
      </Link>
    </SafeAreaView>
  );
};

export default ProfileScreen;
