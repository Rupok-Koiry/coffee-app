import { Enums } from "@/constants/types";
import { getProducts } from "@/services/apiProducts";
import { useInfiniteQuery } from "@tanstack/react-query";

type UseProductsParams = {
  type: Enums<"product_type_enum">;
  filter?: string;
  searchText?: string;
};

export function useProducts({
  type,
  filter = "",
  searchText = "",
}: UseProductsParams) {
  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["products", type, filter, searchText],
      queryFn: ({ pageParam }) =>
        getProducts({ type, filter, searchText, page: pageParam }),
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
