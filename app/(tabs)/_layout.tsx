import { Tabs, useRouter } from "expo-router";
import React, { useState } from "react";
import { COLORS } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@/api/auth/useUser";
import SignInModal from "@/components/SignInModal";

export default function TabLayout() {
  const { user } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleProfilePress = () => {
    if (!user) {
      setModalVisible(true);
    } else {
      router.push("/profile");
    }
  };

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primaryOrangeHex,
          tabBarInactiveTintColor: COLORS.primaryLightGreyHex,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 80,
            backgroundColor: COLORS.primaryBlackHex,
            borderTopWidth: 0,
            elevation: 0,
            borderTopColor: "transparent",
          },
        }}
      >
        <Tabs.Screen
          name="product"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" color={color} size={28} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="cart" color={color} size={28} />
            ),
          }}
        />

        <Tabs.Screen
          name="order"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="list" color={color} size={28} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              handleProfilePress();
            },
          }}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" color={color} size={28} />
            ),
          }}
        />
      </Tabs>
      <SignInModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="Please sign in to continue"
      />
    </>
  );
}
