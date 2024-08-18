import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/apiAuth";
import { useEffect } from "react";
import supabase from "@/services/supabase";

export function useUser() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
  });

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [queryClient]);

  return { isLoading, user, error };
}
