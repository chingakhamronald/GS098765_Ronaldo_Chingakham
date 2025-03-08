import { useQuery } from "@tanstack/react-query";
import { instanceAxios } from "../../App";

export const usePlanningsData = () => {
  return useQuery({
    queryKey: ["plannings"],
    queryFn: async () => {
      const res = await instanceAxios.get(`/plannings`);

      console.log(res);
      return await res.data;
    },
  });
};
