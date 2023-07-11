import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import { HymnQuery } from "../../App";
import APIClient, { FetchResponse } from "../../services/api-client";
import { Topic } from "./useTopics";

const apiClient = new APIClient<Hymn>("/hymnbook/hymns");

interface Author {
  id: number;
  first_name: string;
  last_name: string;
}

interface Arranger {
  id: number;
  first_name: string;
  last_name: string;
}

interface Audio {
  id: number;
  voice: string;
  audio: string;
}

export interface Hymn {
  id: number;
  title: string;
  topic: Topic;
  author?: Author;
  arranger?: Arranger;
  release_date: string;
  pdf_file: string;
  audio_set?: Audio[];
}

const useHymns = (hymnQuery: HymnQuery) =>
  useInfiniteQuery<FetchResponse<Hymn>, Error>({
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

export default useHymns;
