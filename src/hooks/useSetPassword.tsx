import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import SetPassword from "../entities/SetPassword";
import { useAuthHeader } from "react-auth-kit";

const apiClient = new APIClient("/auth/users/set_password/");

export const useSetPassword = () => {
  const authHeader = useAuthHeader();
  return useMutation({
    mutationKey: ["setPassword"],
    mutationFn: (newPassowrd: SetPassword) =>
      apiClient.post(newPassowrd, { headers: { Authorization: authHeader() } }),
  });
};

export default useSetPassword;
