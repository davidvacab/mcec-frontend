import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { UserActivate } from "../entities/UserActivate";

const apiClient = new APIClient("/users/resend_activation/");

export const useUserActivate = () => {
  return useMutation({
    mutationKey: ["userActivation"],
    mutationFn: (data: UserActivate) => apiClient.post(data),
  });
};

export default useUserActivate;
