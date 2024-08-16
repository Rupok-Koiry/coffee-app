import { useUser } from "@/api/auth/useUser";
import Loader from "@/components/loader/Loader";
import { Href, Redirect, useRouter } from "expo-router";
import React from "react";

const withGuest = <P extends {}>(
  WrappedComponent: React.ComponentType<P>,
  redirectTo: Href = "/(tabs)/product"
) => {
  return React.memo((props: P) => {
    const { user, isLoading } = useUser();
    const router = useRouter();

    if (isLoading) return <Loader />;
    if (user) {
      return <Redirect href={redirectTo} />;
    }

    return <WrappedComponent {...props} />;
  });
};

export default withGuest;
