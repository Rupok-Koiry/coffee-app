import React from "react";
import { Redirect } from "expo-router";
import { useUser } from "@/hooks/auth/useUser";
import Loader from "@/components/loaders/Loader";
import { Enums } from "@/constants/types";

type ProtectedRouteProps = {
  children: React.ReactNode;
  roles?: Enums<"user_role_enum">[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return <Redirect href="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
