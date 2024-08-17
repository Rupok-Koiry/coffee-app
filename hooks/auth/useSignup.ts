import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "@/services/apiAuth";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

export function useSignup() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      Toast.show({
        type: "success",
        text1: "Signup successful",
      });
      router.push("/(tabs)/product");
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    },
  });

  return { signup, isPending };
}
