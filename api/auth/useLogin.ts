import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '@/services/apiAuth';
import Toast from 'react-native-toast-message';

export function useLogin() {
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn:loginApi,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      Toast.show({
        type: "success",
        text1: "Login successful",
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    },
  });

  return { login, isPending };
}