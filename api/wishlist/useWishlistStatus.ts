import { getWishlistStatus } from "@/services/apiWishlist";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export function useWishlistStatus() {
  const { productId } = useLocalSearchParams();
  const userId = "1ed91ebd-c660-43bc-8ac6-e4930bdf17b0";
  const convertedProductId = Array.isArray(productId)
    ? Number(productId[0])
    : Number(productId);

  const {
    isLoading,
    data: wishlistId,
    error,
  } = useQuery({
    queryKey: ["wishlist", convertedProductId],
    queryFn: () => getWishlistStatus(convertedProductId, userId),
    retry: false,
  });

  return { isLoading, error, wishlistId };
}
