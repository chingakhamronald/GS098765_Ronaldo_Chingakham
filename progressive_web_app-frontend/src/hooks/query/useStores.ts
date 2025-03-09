import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../../App";

export const useStores = () => {
  return useQuery({
    queryKey: ["stores"],
    queryFn: async () => {
      const res = await instanceAxios.get("/stores");
      return res.data;
    },
  });
};
