import { getWishlist } from "@/services/apiWishlist";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useWishlist() {
  const userId = "2c0cea61-c686-4f7a-b6d2-16983584e121";
  const { data, error, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["wishlist", userId],
      queryFn: ({ pageParam }) => getWishlist({ userId, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 0) return;
        return allPages.length + 1;
      },
    });

  const wishlist = data?.pages?.flat() ?? [];
  return {
    wishlist,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
  };
}
