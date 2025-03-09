import { useMutation } from "@tanstack/react-query";
import { instanceAxios } from "../../App";
import { IStorePostData } from "../../type";

export const useUpdateStore = () => {
  return useMutation({
    mutationKey: ["update-store"],
    mutationFn: async ({
      storeId,
      ...postData
    }: { storeId: string } & IStorePostData) => {
      const res = await instanceAxios.put(`/store/${storeId}`, postData);
      return res.data;
    },
  });
};
