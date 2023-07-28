import { useMutation, useQuery } from "@tanstack/react-query";
import ms from "ms";
import { useAuthHeader } from "react-auth-kit";
import APIClient from "../services/api-client";
import { Church } from "../entities/Church";

const apiClient = new APIClient<Church>("/members/churches/me/");

const useChurch = () => {
  const authHeader = useAuthHeader();
  const config = { headers: { Authorization: authHeader() } };
  return useQuery({
    queryKey: ["church"],
    queryFn: () => apiClient.get(config),
    staleTime: ms("24h"),
  });
};

export const useChurchUpdate = () => {
  const authHeader = useAuthHeader();
  return useMutation({
    mutationKey: ["churchUpdate"],
    mutationFn: (church: Church) =>
      apiClient.post({
        headers: { Authorization: authHeader() },
        data: church,
      }),
    onError: () => {
      throw new Response("Not Found", { status: 404 });
    },
  });
};

export default useChurch;
