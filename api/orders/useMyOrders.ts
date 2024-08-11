import { Enums } from "@/constants/types";
import { getMyOrders } from "@/services/apiOrders";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useUser } from "../auth/useUser";

export function useMyOrders(
  status?: Enums<"order_status_enum"> | Enums<"order_status_enum">[] | ""
) {
  const {user}=useUser()
  const userId=user?.id??''
  const { data, error, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["orders", status],
      queryFn: ({ pageParam }) => getMyOrders({ status, page: pageParam,userId}),
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
