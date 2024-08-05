import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder as createOrderApi } from "@/services/apiOrders";
import { useCreateOrderItems } from "../order-items/useCreateOrderItems";
import { InsertTables, Tables } from "@/constants/types";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { createOrderItems } = useCreateOrderItems();

  const { mutate: createOrder, isPending: isCreating } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: ({
      orderItems,
    }: {
      orderItems: InsertTables<"order_items">[];
    }) => {
      createOrderItems(orderItems);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => console.warn(err.message),
  });

  return { isCreating, createOrder };
}
