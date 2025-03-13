import { useMutation } from "@tanstack/react-query";
import { instanceAxios } from "../../App";

export const useCreateStore = () => {
  return useMutation({
    mutationKey: ["store-create"],
    mutationFn: async (postData) => {
      const res = await instanceAxios.post("/store", postData);
      return res.data;
    },
  });
};
