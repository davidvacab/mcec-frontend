import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { Hymn } from "../entities/Hymn";
import ms from "ms";
import { useAuthHeader } from "react-auth-kit";

const apiClient = new APIClient<Hymn>("/hymnbook/hymns");

// export const hymnLoader = ({ params }: Params) => {
//   const results = useQuery({
//     queryKey: ["hymns", params],
//     queryFn: () => apiClient.get(params),
//     staleTime: ms("24h"),
//   });
//   return results;
// };

const useHymn = (id: string) => {
  const authHeader = useAuthHeader();
  return useQuery({
    queryKey: ["hymns", id],
    queryFn: () =>
      apiClient.get(id, { headers: { Authorization: authHeader() } }),
    staleTime: ms("24h"),
  });
};

export default useHymn;
