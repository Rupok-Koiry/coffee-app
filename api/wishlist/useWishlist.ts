import { getWishlist } from "@/services/apiWishlist";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useUser } from "../auth/useUser";


export function useWishlist() {
  const {user}=useUser()
  const userId = user?.id ?? "";
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
