import { getWishlist } from "@/services/apiWishlist";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useWishlist() {
  const userId = "1ed91ebd-c660-43bc-8ac6-e4930bdf17b0";
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
