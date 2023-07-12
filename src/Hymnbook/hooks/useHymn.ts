import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { Hymn } from "./useHymns";

const apiClient = new APIClient<Hymn>("/hymnbook/hymns");

const useHymn = (id: number | string) =>
  useQuery({
    queryKey: ["hymns", id],
    queryFn: () => apiClient.get(id),
  });

export default useHymn;
