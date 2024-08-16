import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWishlist as createWishlistApi } from "@/services/apiWishlist";
import Toast from "react-native-toast-message";

export function useCreateWishlist() {
  const queryClient = useQueryClient();

  const { mutate: createWishlist, isPending: isCreating } = useMutation({
    mutationFn: createWishlistApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      Toast.show({
        type: "success",
        text1: "Wishlist Added Successfully!",
      });
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: err.message,
      });
    },
  });

  return { isCreating, createWishlist };
}
