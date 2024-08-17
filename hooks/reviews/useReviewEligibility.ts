import { checkReviewEligibility } from "@/services/apiReviews";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useUser } from "../auth/useUser";

export function useReviewEligibility() {
  const { orderId } = useLocalSearchParams();
  const parsedOrderId = Array.isArray(orderId)
    ? Number(orderId[0])
    : Number(orderId);
  const { user } = useUser();
  const userId = user?.id ?? "";

  const {
    isLoading,
    data: isEligible,
    error,
  } = useQuery({
    queryKey: ["reviewEligibility", parsedOrderId, userId],
    queryFn: () =>
      checkReviewEligibility({
        orderId: parsedOrderId,
        userId,
      }),
    retry: false,
  });

  return { isLoading, error, isEligible };
}
