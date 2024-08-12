import { getOrder } from "@/services/apiOrders";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export function useOrder() {
  const { orderId } = useLocalSearchParams();
  const convertedOrderId = Array.isArray(orderId)
    ? Number(orderId[0])
    : Number(orderId);
  const {
    isLoading,
    data: order,
    error,
  } = useQuery({
    queryKey: ["order", convertedOrderId],
    queryFn: () => getOrder(convertedOrderId),
    retry: false,
  });

  return { isLoading, error, order };
}
