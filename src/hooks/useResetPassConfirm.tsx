import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { ResetPasswordConfirm } from "../entities/ResetPassConfirm";

const apiClient = new APIClient("/users/reset_password_confirm/");

export const useResetPassConfirm = () => {
  return useMutation({
    mutationKey: ["resetPassConfirm"],
    mutationFn: (data: ResetPasswordConfirm) => apiClient.post(data),
  });
};

export default useResetPassConfirm;