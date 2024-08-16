import React from "react";
import { Stack } from "expo-router";
import withAuthorization from "@/app/(auth)/withAuthorization";

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default StackLayout;
