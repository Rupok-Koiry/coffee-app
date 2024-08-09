import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "@/services/apiAuth";
import Toast from "react-native-toast-message";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      Toast.show({
        type: "success",
        text1: "Profile updated successfully",
      });
    },
   
  });

  return { updateUser, isUpdating };
}