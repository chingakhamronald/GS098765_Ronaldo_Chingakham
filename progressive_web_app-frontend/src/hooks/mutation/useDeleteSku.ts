import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instanceAxios } from "../../App";

export const useDeleteSku = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-sku"],
    mutationFn: async (skuID) => {
      const res = await instanceAxios.delete(`/sku/${skuID}`);
      return res.data;
    },
    onSuccess(data) {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["sku"] });
      }
    },
  });
};
