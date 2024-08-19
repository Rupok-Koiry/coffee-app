import React from "react";
import { Stack } from "expo-router";
import withAuthorization from "@/utils/withAuthorization";

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default withAuthorization(StackLayout, ["ADMIN", "USER"]);
