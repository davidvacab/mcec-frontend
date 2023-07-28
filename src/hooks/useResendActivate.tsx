import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient("/users/resend_activation/");

export const useResendActivate = () => {
  return useMutation({
    mutationKey: ["resendActivate"],
    mutationFn: (email: string | undefined) => apiClient.post({ email: email }),
  });
};

export default useResendActivate;
