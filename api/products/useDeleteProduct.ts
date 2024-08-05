import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct as deleteProductApi } from "@/services/apiProducts";
import Toast from "react-native-toast-message";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteProduct } = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      Toast.show({
        type: "error",
        text1: "Product Deleted Successfully!",
      });
    },
    onError: (err) => console.warn(err.message),
  });

  return { isDeleting, deleteProduct };
}
