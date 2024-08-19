import { useUser } from "@/hooks/auth/useUser";
import Loader from "@/components/loaders/Loader";
import { Href, Redirect } from "expo-router";
import React from "react";

// HOC to restrict access to guest users only
const withGuest = <P extends {}>(
  WrappedComponent: React.ComponentType<P>,
  redirectTo: Href = "/(tabs)/product"
) => {
  return React.memo((props: P) => {
    const { user, isLoading } = useUser();
    // Show loader while user data is loading
    if (isLoading) return <Loader />;
    // Redirect if user is authenticated
    if (user) return <Redirect href={redirectTo} />;
    // Render component if no user is authenticated
    return <WrappedComponent {...props} />;
  });
};

export default withGuest;
