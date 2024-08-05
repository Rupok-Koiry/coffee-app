import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateProduct as createUpdateProductApi } from "@/services/apiProducts";
import { useUpdatePrices } from "../prices/useUpdatePrices";

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { updatePrices } = useUpdatePrices();

  const { mutate: updateProduct, isPending: isCreating } = useMutation({
    mutationFn: createUpdateProductApi,
    onSuccess: ({ prices }) => {
      updatePrices(prices);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => console.warn(err.message),
  });

  return { isCreating, updateProduct };
}
