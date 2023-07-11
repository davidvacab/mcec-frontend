import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { FetchResponse } from "../../services/api-client";

const apiClient = new APIClient<Topic>("/hymnbook/topics");

export interface Topic {
  id: number;
  title: string;
}

const useTopics = () =>
  useQuery<FetchResponse<Topic>, Error>({
    queryKey: ["topics"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
  });

export default useTopics;
