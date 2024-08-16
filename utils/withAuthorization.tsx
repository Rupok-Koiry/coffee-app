import React from "react";
import { Redirect } from "expo-router";
import { useUser } from "@/api/auth/useUser";
import Loader from "@/components/loader/Loader";
import { Enums } from "@/constants/types";

const withAuthorization = <P extends {}>(
  WrappedComponent: React.FC<P>,
  roles: Enums<"user_role_enum">[]
) => {
  return React.memo((props: P) => {
    const { user, isLoading } = useUser();

    if (isLoading) return <Loader />;

    if (!user) {
      // Redirect to sign-in if not authenticated
      return <Redirect href="/(auth)/sign-in" />;
    }

    if (roles && roles.length > 0 && !roles.includes(user.role)) {
      // If the user's role is not in the allowed roles, redirect to home
      return <Redirect href="/" />;
    }

    // Render the wrapped component if the user is authorized
    return <WrappedComponent {...props} />;
  });
};

export default withAuthorization;
