import { useMutation } from "@tanstack/react-query";
import { instanceAxios } from "../../App";

export const useCreateSku = () => {
  return useMutation({
    mutationKey: ["sku-create"],
    mutationFn: async (postData) => {
      const res = await instanceAxios.post("/sku", postData);
      return res.data;
    },
  });
};
