import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrUpdateProduct as createOrUpdateProductApi } from "@/services/apiProducts";
import Toast from "react-native-toast-message";

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { mutate: updateProduct, isPending: isCreating } = useMutation({
    mutationFn: createOrUpdateProductApi,
    onSuccess: () => {
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
