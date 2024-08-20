import React, { useState } from "react";
import { View, Text, Image, Switch, StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import ProfileOption from "@/components/ProfileOption";
import HeaderBar from "@/components/HeaderBar";
import { useUser } from "@/hooks/auth/useUser";
import { SUPABASE_URL } from "@/services/supabase";
import { format } from "date-fns";
import { useLogout } from "@/hooks/auth/useLogout";
import { Redirect, useRouter } from "expo-router";
import Loader from "@/components/loaders/Loader";
import { useColorScheme } from "nativewind";

const ProfileScreen: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === "dark");

  const { user, isLoading } = useUser();

  const toggleDarkMode = () => {
    toggleColorScheme();
    setDarkMode((darkMode) => !darkMode);
  };
  const { logout, isPending } = useLogout();
  const handleLogout = () => {
    logout();
  };

  if (isLoading) return <Loader />;
  if (!user) return <Redirect href="/(auth)/sign-in" />;

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors[colorScheme].primaryBackgroundHex,
        flex: 1,
      }}
    >
      <StatusBar backgroundColor={Colors[colorScheme].primaryBackgroundHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderBar title="Profile" />
        <View className="px-5 mb-5">
          <View className="bg-tertiary-background w-32 h-32 p-4 rounded-full mx-auto">
            <LinearGradient
              colors={[
                Colors[colorScheme].primaryOrangeHex,
                Colors[colorScheme].primaryTextHex,
              ]}
              start={[0, 0]}
              end={[1, 1]}
              style={{ borderRadius: 999, padding: 2 }}
            >
              <Image
                source={{
                  uri: `${SUPABASE_URL}/storage/v1/object/public/avatars/${user.avatar}`,
                }}
                className="w-full h-full rounded-full"
              />
            </LinearGradient>
          </View>
          <Text className="font-poppins-semibold text-xl text-primary-text text-center my-4">
            Hello, <Text className="text-primary-orange">{user.full_name}</Text>
          </Text>
          <View className="flex-row items-center" style={{ gap: 20 }}>
            <Ionicons
              name="calendar"
              size={24}
              color={Colors[colorScheme].accentTextHex}
            />
            <Text className="text-sm text-secondary-text">
              Joined {format(user.created_at, "MMMM dd, yyyy")}
            </Text>
          </View>
        </View>
        <LinearGradient
          colors={[
            Colors[colorScheme].secondaryGreyHex,
            Colors[colorScheme].primaryBackgroundHex,
          ]}
          className="flex-1"
          style={{ borderRadius: 16 }}
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
              link="/(tabs)/profile/wishlist"
            />
            {user.role === "ADMIN" && (
              <>
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
              </>
            )}
            <ProfileOption
              iconName="language"
              label="Language"
              extraContent={
                <View className="flex-row items-center space-x-3">
                  <Text className="text-base text-secondary-text font-poppins-medium">
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
                  onValueChange={toggleDarkMode}
                  trackColor={{
                    true: Colors[colorScheme].secondaryTextHex,
                    false: Colors[colorScheme].secondaryTextHex,
                  }}
                  thumbColor={
                    darkMode ? Colors[colorScheme].primaryOrangeHex : "#f4f3f4"
                  }
                  className="scale-110"
                />
              }
            />
          </View>
          <Button
            containerClassName="self-center"
            onPress={handleLogout}
            outline
            loading={isPending}
            disabled={isPending}
          >
            Logout
          </Button>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
