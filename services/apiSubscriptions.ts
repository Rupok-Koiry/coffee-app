import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import supabase from "./supabase";

export const useUpdateOrderSubscription = (orderId: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const orders = supabase
      .channel('custom-filter-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          // Invalidate the query by passing the key as an array
          queryClient.invalidateQueries({ queryKey: ["order", orderId] });
        }
      )
      .subscribe();

    // Cleanup on component unmount
    return () => {
      orders.unsubscribe();
    };
  }, [orderId, queryClient]); // Make sure to include queryClient in the dependency array
};
