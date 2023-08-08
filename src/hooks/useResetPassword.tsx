import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient("/auth/users/reset_password/");

export const useResetPassword = () => {
  return useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: (email: string | undefined) => apiClient.post({ email: email }),
  });
};

export default useResetPassword;
