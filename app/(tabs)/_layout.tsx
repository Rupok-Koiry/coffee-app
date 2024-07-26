import { Tabs } from "expo-router";
import React from "react";
import { COLORS } from "@/theme/theme";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
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
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" color={color} size={28} />
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
    </Tabs>
  );
}
