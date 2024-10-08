import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "@/services/apiAuth";
import { useRouter } from "expo-router";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.setQueryData(["user"], null);
      router.push("/(auth)/sign-in");
    },
  });

  return { logout, isPending };
}
