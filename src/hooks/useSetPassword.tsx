import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { SetPassword } from "../entities/SetPassword";
import { useAuthHeader } from "react-auth-kit";

const apiClient = new APIClient("/users/set_password/");

export const useSetPassword = () => {
  const authHeader = useAuthHeader();
  return useMutation({
    mutationKey: ["setPassword"],
    mutationFn: (data: SetPassword) =>
      apiClient.post({ headers: { Authorization: authHeader() }, data }),
  });
};

export default useSetPassword;
