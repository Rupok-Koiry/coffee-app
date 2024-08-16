import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReviews as updateReviewsApi } from "@/services/apiReviews";
import Toast from "react-native-toast-message";

export function useUpdateReviews() {
  const queryClient = useQueryClient();

  const { mutate: updateReviews, isPending: isUpdating } = useMutation({
    mutationFn: updateReviewsApi,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Review Updated Successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: err.message,
      });
    },
  });

  return { isUpdating, updateReviews };
}
