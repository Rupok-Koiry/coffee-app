import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrUpdateProduct as createOrUpdateProductApi } from "@/services/apiProducts";
import Toast from "react-native-toast-message";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const { mutate: createProduct, isPending: isCreating } = useMutation({
    mutationFn: createOrUpdateProductApi,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Product Created Successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: err.message,
      });
    },
  });

  return { isCreating, createProduct };
}
