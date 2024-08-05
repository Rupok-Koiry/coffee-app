import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePrices as updatePricesApi } from "@/services/apiPrices";

export function useUpdatePrices() {
  const queryClient = useQueryClient();

  const { mutate: updatePrices, isPending: isCreating } = useMutation({
    mutationFn: updatePricesApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prices"] });
    },
    onError: (err) => console.warn(err.message),
  });

  return { isCreating, updatePrices };
}
