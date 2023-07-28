import { useMutation, useQuery } from "@tanstack/react-query";
import ms from "ms";
import { useAuthHeader } from "react-auth-kit";
import APIClient from "../services/api-client";
import { Profile } from "../entities/Profile";

const apiClient = new APIClient<Profile>("/members/profiles/me/");

const useProfile = () => {
  const authHeader = useAuthHeader();
  const config = { headers: { Authorization: authHeader() } };
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => apiClient.get(config),
    staleTime: ms("24h"),
  });
};

export const useProfileUpdate = () => {
  const authHeader = useAuthHeader();
  return useMutation({
    mutationKey: ["profileUpdate"],
    mutationFn: (profile: Profile) =>
      apiClient.post({
        headers: { Authorization: authHeader() },
        data: profile,
      }),
    onError: () => {
      throw new Response("Not Found", { status: 404 });
    },
  });
};

export default useProfile;