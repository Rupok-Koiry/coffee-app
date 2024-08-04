import { Enums } from "@/constants/types";
import { getOrders } from "@/services/apiOrders";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useOrders(
  status?: Enums<"order_status_enum"> | Enums<"order_status_enum">[]
) {
  const { data, error, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["orders", status],
      queryFn: ({ pageParam }) => getOrders({ status, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 0) return;
        return allPages.length + 1;
      },
    });

  const orders = data?.pages?.flat() ?? [];
  return {
    orders,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
  };
}
