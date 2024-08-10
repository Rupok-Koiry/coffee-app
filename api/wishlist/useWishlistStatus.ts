import { getWishlistStatus } from "@/services/apiWishlist";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useUser } from "../auth/useUser";

export function useWishlistStatus() {
  const { productId } = useLocalSearchParams();
  const {user}=useUser()
  const convertedProductId = Array.isArray(productId)
    ? Number(productId[0])
    : Number(productId);

  const {
    isLoading,
    data: wishlistId,
    error,
  } = useQuery({
    queryKey: ["wishlist", convertedProductId],
    queryFn: () => getWishlistStatus(convertedProductId, user?.id),
    retry: false,
  });

  return { isLoading, error, wishlistId };
}
