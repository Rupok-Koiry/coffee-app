import { View, Text, Image } from "react-native";
import React from "react";

const ProfilePic = () => {
  return (
    <View className="rounded-xl border-2 border-secondary-dark-grey overflow-hidden">
      <Image
        source={require("../assets/app_images/avatar.png")}
        className="w-9 h-9"
      />
    </View>
  );
};

export default ProfilePic;
