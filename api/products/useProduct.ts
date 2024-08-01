import { getProduct } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export function useProduct() {
  const { productId } = useLocalSearchParams();
  const convertedProductId = Array.isArray(productId)
    ? Number(productId[0])
    : Number(productId);
  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(convertedProductId),
    retry: false,
  });

  return { isLoading, error, product };
}
