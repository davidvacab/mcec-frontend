import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import UserActivate from "../entities/UserActivate";

const apiClient = new APIClient("/auth/users/activation/");

export const useUserActivate = () => {
  return useMutation({
    mutationKey: ["userActivation"],
    mutationFn: (tokens: UserActivate) => apiClient.post(tokens),
  });
};

export default useUserActivate;
