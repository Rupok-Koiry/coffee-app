import { Enums } from "@/constants/types";
import { getProducts } from "@/services/apiProducts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

type UseProductsParams = {
  type?: Enums<"product_type_enum"> | "";
  filter?: string;
};

export function useProducts({ type, filter = "" }: UseProductsParams) {
  const { search } = useLocalSearchParams();
  const convertedSearch = Array.isArray(search)
    ? search[0]
    : (search as string);

  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["products", type, filter, convertedSearch],
      queryFn: ({ pageParam }) =>
        getProducts({ type, filter, search: convertedSearch, page: pageParam }),
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
