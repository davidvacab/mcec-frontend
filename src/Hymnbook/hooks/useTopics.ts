import { useQuery } from "@tanstack/react-query";
import apiClient, { FetchResponse } from "../../services/api-client";

export interface Topic {
  id: number | string;
  title: string;
}

const useTopics = () =>
  useQuery<FetchResponse<Topic>, Error>({
    queryKey: ["topics"],
    queryFn: () =>
      apiClient
        .get<FetchResponse<Topic>>("/hymnbook/topics")
        .then((res) => res.data),
    staleTime: 24 * 60 * 60 * 1000, //24 hours
  });

export default useTopics;
