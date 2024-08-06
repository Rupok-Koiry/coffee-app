import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateProduct as createUpdateProductApi } from "@/services/apiProducts";
import { useUpdatePrices } from "../prices/useUpdatePrices";
import Toast from "react-native-toast-message";

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { updatePrices } = useUpdatePrices();

  const { mutate: updateProduct, isPending: isCreating } = useMutation({
    mutationFn: createUpdateProductApi,
    onSuccess: ({ prices }) => {
      updatePrices(prices);
      Toast.show({
        type: "success",
        text1: "Product Updated Successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => console.warn(err.message),
  });

  return { isCreating, updateProduct };
}
