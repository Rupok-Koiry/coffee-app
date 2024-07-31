import { getProducts } from "@/services/apiProducts";
import { useInfiniteQuery } from "@tanstack/react-query";
type UseProductsParams = {
  type: string;
  filter: string;
};

export function useProducts({ type, filter }: UseProductsParams) {
  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["products", type],
      queryFn: ({ pageParam }) =>
        getProducts({ type, filter, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 0) return;
        return allPages.length + 1;
      },
    });

  const products = data?.pages?.flat() ?? [];
  return {
    products,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
  };
}
