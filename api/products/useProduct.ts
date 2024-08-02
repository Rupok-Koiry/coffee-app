import { getProduct } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export function useProduct() {
  const { productId } = useLocalSearchParams();
  const userId = "2c0cea61-c686-4f7a-b6d2-16983584e121";
  const convertedProductId = Array.isArray(productId)
    ? Number(productId[0])
    : Number(productId);
  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(convertedProductId, userId),
    retry: false,
  });

  return { isLoading, error, product };
}
