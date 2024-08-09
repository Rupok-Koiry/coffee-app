import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "@/services/apiAuth";
import Toast from "react-native-toast-message";

export function useSignup() {
  const queryClient = useQueryClient();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      Toast.show({
        type: "success",
        text1: "Signup successful",
      });
      
    },
  });

  return { signup, isPending };
}