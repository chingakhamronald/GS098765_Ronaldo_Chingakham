import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../../App";

export const useSku = () => {
  return useQuery({
    queryKey: ["sku"],
    queryFn: async () => {
      const res = await instanceAxios.get("/sku");
      return res.data;
    },
  });
};
