import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { Hymn } from "../entities/Hymn";
import { useAuthHeader } from "react-auth-kit";
import ms from "ms";

const apiClient = new APIClient<Hymn>("/hymnbook/hymns");

const useHymn = (id: number | string) => {
  const authHeader = useAuthHeader();

  return useQuery({
    queryKey: ["hymns", id],
    queryFn: () =>
      apiClient.get(id, { headers: { Authorization: authHeader() } }),
    staleTime: ms("24h"),
  });
};

export default useHymn;
