import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useCallback, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@/hooks/auth/useUser";
import SignInModal from "@/components/modals/SignInModal";
import { EventArg } from "@react-navigation/native";

export default function TabLayout() {
  const { colorScheme } = useColorScheme();

  const { user } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const handleTabPress = useCallback(
    (e: EventArg<"tabPress", true>) => {
      if (!user) {
        e.preventDefault();
        setModalVisible(true);
      }
    },
    [user]
  );
  return (
    <React.Fragment>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors[colorScheme].primaryOrangeHex,
          tabBarInactiveTintColor: Colors[colorScheme].accentTextHex,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 68,
            backgroundColor: Colors[colorScheme].primaryBackgroundHex,
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
          listeners={{
            tabPress: handleTabPress,
          }}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="list" color={color} size={28} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          listeners={{
            tabPress: handleTabPress,
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
        title="Please sign in to enjoy full access to your account"
      />
    </React.Fragment>
  );
}
