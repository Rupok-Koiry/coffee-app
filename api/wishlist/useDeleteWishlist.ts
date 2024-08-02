import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWishlist as deleteWishlistApi } from "@/services/apiWishlist";

export function useDeleteWishlist() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteWishlist } = useMutation({
    mutationFn: deleteWishlistApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
    onError: (err) => console.warn(err.message),
  });

  return { isDeleting, deleteWishlist };
}
