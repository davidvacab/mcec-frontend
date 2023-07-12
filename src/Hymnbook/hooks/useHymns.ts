import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { FetchResponse } from "../../services/api-client";
import { HymnListItem } from "../entities/HymnListItem";
import useHymnQueryStore from "../store";

const apiClient = new APIClient<HymnListItem>("/hymnbook/hymns");

const useHymns = () => {
  const hymnQuery = useHymnQueryStore((s) => s.hymnQuery);
  return useInfiniteQuery<FetchResponse<HymnListItem>, Error>({
    queryKey: ["hymns", hymnQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          topic: hymnQuery.topicId,
          ordering: hymnQuery.sortOrder,
          search: hymnQuery.searchText,
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: ms("24h"),
  });
};

export default useHymns;
