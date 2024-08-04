import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus as updateOrderStatusApi } from "@/services/apiOrders";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  const { mutate: updateOrderStatus, isPending: isCreating } = useMutation({
    mutationFn: updateOrderStatusApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => console.warn(err.message),
  });

  return { isCreating, updateOrderStatus };
}
