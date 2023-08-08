import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import ResetPasswordConfirm from "../entities/ResetPassConfirm";

const apiClient = new APIClient("/auth/users/reset_password_confirm/");

export const useResetPassConfirm = () => {
  return useMutation({
    mutationKey: ["resetPassConfirm"],
    mutationFn: (tokens: ResetPasswordConfirm) => apiClient.post(tokens),
  });
};

export default useResetPassConfirm;
