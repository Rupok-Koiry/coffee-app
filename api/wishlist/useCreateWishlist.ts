import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWishlist as createWishlistApi } from "@/services/apiWishlist";

export function useCreateWishlist() {
  const queryClient = useQueryClient();

  const { mutate: createWishlist, isPending: isCreating } = useMutation({
    mutationFn: createWishlistApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (err) => console.warn(err.message),
  });

  return { isCreating, createWishlist };
}
