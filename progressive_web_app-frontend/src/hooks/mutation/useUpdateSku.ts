import { useMutation } from "@tanstack/react-query";
import { instanceAxios } from "../../App";
import { ISkuPostData } from "../../type";

export const useUpdateSku = () => {
  return useMutation({
    mutationKey: ["update-sku"],
    mutationFn: async ({
      skuId,
      ...postData
    }: { skuId: string } & ISkuPostData) => {
      const res = await instanceAxios.put(`/sku/${skuId}`, postData);
      return res.data;
    },
  });
};
