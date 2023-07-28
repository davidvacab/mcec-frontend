import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { Hymn } from "../entities/Hymn";
import ms from "ms";
import { useAuthHeader } from "react-auth-kit";

const apiClient = new APIClient<Hymn>("/hymnbook/hymns");

const useHymn = (id: string) => {
  const authHeader = useAuthHeader();
  const config = { headers: { Authorization: authHeader() } };
  return useQuery({
    queryKey: ["hymns", id],
    queryFn: () => apiClient.getID(id, config),
    staleTime: ms("24h"),
  });
};

export default useHymn;
