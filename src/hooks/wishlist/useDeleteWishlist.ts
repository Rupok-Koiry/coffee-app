import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWishlist as deleteWishlistApi } from "@/services/apiWishlist";
import Toast from "react-native-toast-message";

export function useDeleteWishlist() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteWishlist } = useMutation({
    mutationFn: deleteWishlistApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
      Toast.show({
        type: "success",
        text1: "Wishlist Removed Successfully!",
      });
    },
    onError: (err) =>
      Toast.show({
        type: "error",
        text1: err.message,
      }),
  });

  return { isDeleting, deleteWishlist };
}
