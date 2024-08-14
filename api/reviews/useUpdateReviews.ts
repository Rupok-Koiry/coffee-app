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
    onError: (err) => console.warn(err),
  });

  return { isUpdating, updateReviews };
}
