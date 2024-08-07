import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrderWithItems as createOrderWithItemsApi } from "@/services/apiOrders";

export function useCreateOrderWithItems() {
  const queryClient = useQueryClient();

  const { mutate: createOrderWithItems, isPending: isCreating } = useMutation({
    mutationFn: createOrderWithItemsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => console.warn(err.message),
  });

  return { isCreating, createOrderWithItems };
}
