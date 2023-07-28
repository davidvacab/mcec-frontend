import { useMutation } from "@tanstack/react-query";
import { Credentials } from "../entities/Credentials";
import { UserAuthToken } from "../entities/TokenUser";
import APIClient from "../services/api-client";

const apiClient = new APIClient<UserAuthToken, Credentials>(
  "/auth/jwt/create/"
);

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: Credentials) => apiClient.post(data),
  });
};

export default useLogin;
