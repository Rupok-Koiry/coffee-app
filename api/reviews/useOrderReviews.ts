import { getOrderReviews } from "@/services/apiReviews";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export function useOrderReviews() {
  const { orderId } = useLocalSearchParams();
  const parsedOrderId = Array.isArray(orderId)
    ? Number(orderId[0])
    : Number(orderId);

  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ["orderReviews", parsedOrderId],
    queryFn: () => getOrderReviews(parsedOrderId),
    retry: false,
  });

  return { isLoading, error, reviews };
}
