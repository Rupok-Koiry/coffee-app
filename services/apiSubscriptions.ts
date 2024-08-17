import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import supabase from "./supabase";

// Custom hook to subscribe to updates on a specific order
export const useUpdateOrderSubscription = (orderId: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Set up a Supabase channel to listen for updates to the specific order
    const orders = supabase
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${orderId}`, // Filter updates to only the relevant order ID
        },
        (payload) => {
          // Invalidate the query to ensure fresh data is fetched
          queryClient.invalidateQueries({ queryKey: ["order", orderId] });
        }
      )
      .subscribe();

    // Cleanup: Unsubscribe from the channel when the component unmounts
    return () => {
      orders.unsubscribe();
    };
  }, [orderId, queryClient]); // Ensure the effect re-runs if orderId or queryClient changes
};
