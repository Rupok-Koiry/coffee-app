import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "@/services/apiAuth";
import Toast from "react-native-toast-message";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Signup successful",
      });
      
    },
  });

  return { signup, isPending };
}