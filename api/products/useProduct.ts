import { getProduct } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export function useProduct() {
  const { productId } = useLocalSearchParams();

  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    retry: false,
  });

  return { isLoading, error, product };
}
