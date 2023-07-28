import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { FetchResponse } from "../../services/api-client";
import { Topic } from "../entities/Topic";

const apiClient = new APIClient<Topic>("/hymnbook/topics/");

const useTopics = () =>
  useQuery<FetchResponse<Topic>, Error>({
    queryKey: ["topics"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
  });

export default useTopics;
