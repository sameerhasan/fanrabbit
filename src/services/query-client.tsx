import { AxiosResponse } from "axios";
import { MutationCache, QueryCache, QueryClient } from "react-query";
import { toast } from "react-toastify";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if ((error as AxiosResponse).status === 422) {
        Object.values((error as AxiosResponse)?.data?.errors).forEach(
          (item: unknown) => {
            toast.error(item as string);
          }
        );

        return;
      }
      toast.error((error as AxiosResponse)?.data?.message);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if ((error as AxiosResponse).status === 422) {
        Object.values((error as AxiosResponse)?.data?.errors).forEach(
          (item: unknown) => {
            toast.error(item as string);
          }
        );

        return;
      }
      toast.error((error as AxiosResponse).data?.message);
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
