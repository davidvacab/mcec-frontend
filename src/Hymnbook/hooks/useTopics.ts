import { useQuery } from "@tanstack/react-query";
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
    staleTime: 24 * 60 * 60 * 1000, //24 hours
  });

export default useTopics;
