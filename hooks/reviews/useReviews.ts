import { getReviews } from "@/services/apiReviews";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export function useReviews() {
  const { productId } = useLocalSearchParams();
  const parsedProductId = Array.isArray(productId)
    ? Number(productId[0])
    : Number(productId);

  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ["reviews", parsedProductId],
    queryFn: () => getReviews(parsedProductId),
    retry: false,
  });

  return { isLoading, error, reviews };
}
