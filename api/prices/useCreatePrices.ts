import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPrices as createPricesApi } from "@/services/apiPrices";

export function useCreatePrices() {
  const queryClient = useQueryClient();

  const { mutate: createPrices, isPending: isCreating } = useMutation({
    mutationFn: createPricesApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prices"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => console.warn(err),
  });

  return { isCreating, createPrices };
}
