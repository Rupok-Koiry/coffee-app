import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateProduct as createUpdateProductApi } from "@/services/apiProducts";
import { useCreatePrices } from "../prices/useCreatePrices";
import { InsertTables } from "@/constants/types";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const { createPrices } = useCreatePrices();

  const { mutate: createProduct, isPending: isCreating } = useMutation({
    mutationFn: createUpdateProductApi,
    onSuccess: ({ prices }) => {
      createPrices(prices);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => console.warn(err.message),
  });

  return { isCreating, createProduct };
}
