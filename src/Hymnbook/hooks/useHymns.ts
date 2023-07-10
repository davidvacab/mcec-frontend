import { useQuery } from "@tanstack/react-query";
import { HymnQuery } from "../../App";

import { Topic } from "./useTopics";
import APIClient, { FetchResponse } from "../../services/api-client";

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
  author: Author;
  arranger: Arranger;
  release_date: string;
  pdf_file: string;
  audio_set: Audio[];
}

const useHymns = (hymnQuery: HymnQuery) =>
  useQuery<FetchResponse<Hymn>, Error>({
    queryKey: ["hymns", hymnQuery],
    queryFn: () =>
      apiClient.getAll({
        params: {
          topic: hymnQuery.topic?.id,
          ordering: hymnQuery.sortOrder,
          search: hymnQuery.searchText,
        },
      }),
  });

export default useHymns;
