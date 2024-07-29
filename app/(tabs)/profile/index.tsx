import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Switch,
  StatusBar,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import Button from "@/components/Button";
import { COLORS } from "@/theme/theme";
import ProfileOption from "@/components/ProfileOption";
import HeaderBar from "@/components/HeaderBar";

const ProfileScreen: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-primary-black">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderBar title="Profile" />
        <View className="px-5 mb-5">
          <View className="bg-secondary-dark-grey w-32 h-32 p-4 rounded-full mx-auto">
            <LinearGradient
              colors={[COLORS.primaryOrangeHex, COLORS.primaryWhiteHex]}
              start={[0, 0]}
              end={[1, 1]}
              style={{ borderRadius: 999, padding: 2 }}
            >
              <Image
                source={require("@/assets/app_images/avatar.png")}
                className="w-full h-full rounded-full"
              />
            </LinearGradient>
          </View>
          <Text className="font-poppins-semibold text-xl text-primary-white text-center my-4">
            Hello, John Doe
          </Text>
          <View className="flex-row items-center space-x-5">
            <Ionicons
              name="calendar"
              size={24}
              color={COLORS.primaryLightGreyHex}
            />
            <Text className="text-sm text-secondary-light-grey">
              Joined June 2024
            </Text>
          </View>
        </View>
        <LinearGradient
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          className="flex-1 rounded-t-2xl"
        >
          <View className="w-full py-8">
            <ProfileOption
              iconName="person"
              label="Manage Profile"
              link="/(tabs)/profile/manage-profile"
            />
            <ProfileOption
              iconName="locate"
              label="Track Order"
              link="/(tabs)/order/track-order"
            />
            <ProfileOption
              iconName="heart"
              label="Wishlist"
              link="/(tabs)/profile/favorite"
            />
            <ProfileOption
              iconName="storefront"
              label="Manage Products"
              link="/(tabs)/product/manage-products"
            />
            <ProfileOption
              iconName="menu"
              label="Manage Orders"
              link="/(tabs)/order/manage-orders"
            />
            <ProfileOption
              iconName="language"
              label="Language"
              extraContent={
                <View className="flex-row items-center space-x-3">
                  <Text className="text-base text-secondary-light-grey font-poppins-medium">
                    English
                  </Text>
                </View>
              }
            />
            <ProfileOption
              iconName="moon"
              label="Dark Mode"
              extraContent={
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{
                    true: COLORS.secondaryLightGreyHex,
                    false: COLORS.secondaryLightGreyHex,
                  }}
                  thumbColor={darkMode ? COLORS.primaryOrangeHex : "#f4f3f4"}
                  className="scale-110"
                />
              }
            />
          </View>
          <Button containerClassName="self-center">Logout</Button>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
