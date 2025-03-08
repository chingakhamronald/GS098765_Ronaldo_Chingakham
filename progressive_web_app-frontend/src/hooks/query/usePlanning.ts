import { useInfiniteQuery } from "@tanstack/react-query";
import { instanceAxios } from "../../App";

export const usePlanning = (limit = 10) => {
  return useInfiniteQuery({
    queryKey: ["planning", limit],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await instanceAxios.get(
        `/planning?page=${pageParam}&limit=${limit}`
      );
      return await res.data;
    },
    getNextPageParam: (nextPage, allPage) => {
      return nextPage.pagination.hasNextPage ? allPage.length + 1 : undefined;
    },
    getPreviousPageParam: (prevPage, allPage) => {
      return prevPage.pagination.hasPrevPage ? allPage.length - 1 : undefined;
    },
    initialPageParam: 1, // initial page
  });
};
