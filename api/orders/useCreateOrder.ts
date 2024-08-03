import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder as createOrderApi } from "@/services/apiOrders";
import { useCreateOrderItems } from "../order-items/useCreateOrderItems";
import { Tables } from "@/constants/types";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { createOrderItems } = useCreateOrderItems();

  const { mutate: createOrder, isPending: isCreating } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: async ({
      order,
      orderItems,
    }: {
      order: Tables<"orders">;
      orderItems: Tables<"order_items">[];
    }) => {
      await createOrderItems(orderItems);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => console.warn(err.message),
  });

  return { isCreating, createOrder };
}
