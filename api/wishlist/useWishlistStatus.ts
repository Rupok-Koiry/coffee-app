import { getWishlistStatus } from "@/services/apiWishlist";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export function useWishlistStatus() {
  const { productId } = useLocalSearchParams();
  const userId = "2c0cea61-c686-4f7a-b6d2-16983584e121";
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
