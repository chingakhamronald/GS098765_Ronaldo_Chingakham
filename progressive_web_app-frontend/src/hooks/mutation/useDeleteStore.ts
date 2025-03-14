import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instanceAxios } from "../../App";

export const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-store"],
    mutationFn: async (storeID) => {
      const res = await instanceAxios.delete(`/store/${storeID}`);
      return res.data;
    },
    onSuccess(data) {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["stores"] });
      }
    },
  });
};
