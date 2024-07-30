import { Tabs } from "expo-router";
import React from "react";
import { COLORS } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primaryOrangeHex,
        tabBarInactiveTintColor: COLORS.primaryLightGreyHex,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 68,
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
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={28} />
          ),
        }}
      />
    </Tabs>
  );
}
