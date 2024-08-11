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
          queryClient.invalidateQueries({ queryKey: ["order",orderId] });

        }
      )
      .subscribe();

    return () => {
      orders.unsubscribe();
    };
  }, [orderId]);
};