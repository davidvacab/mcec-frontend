import { useMutation, useQuery } from "@tanstack/react-query";
import ms from "ms";
import { useAuthHeader } from "react-auth-kit";
import APIClient from "../services/api-client";
import Church from "../entities/Church";

const apiClient = new APIClient<Church, Church>("/members/churches/me/");

const useChurch = () => {
  const authHeader = useAuthHeader();
  return useQuery({
    queryKey: ["church"],
    queryFn: () => apiClient.get({ headers: { Authorization: authHeader() } }),
    staleTime: ms("24h"),
  });
};

export const useChurchUpdate = () => {
  const authHeader = useAuthHeader();
  return useMutation({
    mutationKey: ["churchUpdate"],
    mutationFn: (church: Church) =>
      apiClient.put(church, {
        headers: { Authorization: authHeader() },
      }),
  });
};

export default useChurch;
