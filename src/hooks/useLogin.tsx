import { useMutation } from "@tanstack/react-query";
import LoginCredentials from "../entities/LoginCredentials";
import UserAuthToken from "../entities/TokenUser";
import APIClient from "../services/api-client";

const apiClient = new APIClient<UserAuthToken, LoginCredentials>(
  "/auth/jwt/create/"
);

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (credentials: LoginCredentials) => apiClient.post(credentials),
  });
};

export default useLogin;
