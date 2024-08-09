import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePassword as  updatePasswordApi} from "@/services/apiAuth";
import Toast from "react-native-toast-message";

export function useUpdatePassword() {

  const { mutate: updatePassword, isPending: isUpdating } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Password updated successfully",
      });
    },
   
  });

  return { updatePassword, isUpdating };
}