import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrderItems as createOrderItemsApi } from "@/services/apiOrderItems";

export function useCreateOrderItems() {
  const queryClient = useQueryClient();

  const { mutate: createOrderItems, isPending: isCreating } = useMutation({
    mutationFn: createOrderItemsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order_items"] });
    },
    onError: (err) => console.warn(err.message),
  });

  return { isCreating, createOrderItems };
}
