import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReviews as createReviewsApi } from "@/services/apiReviews";
import Toast from "react-native-toast-message";

export function useCreateReviews() {
  const queryClient = useQueryClient();

  const { mutate: createReviews, isPending: isCreating } = useMutation({
    mutationFn: createReviewsApi,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Review Created Successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (err) => console.warn(err),
  });

  return { isCreating, createReviews };
}
