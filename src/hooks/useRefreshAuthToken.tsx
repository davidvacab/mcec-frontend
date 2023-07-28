import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient<{ access: string }>("/auth/jwt/refresh/");

export const useRefreshAuthToken = () => {
  return useMutation({
    mutationKey: ["refreshAuthToken"],
    mutationFn: (refreshToken: string | undefined) =>
      apiClient.post({ refreshToken }).then((res) => res.data),
    retry: 1,
  });
};

export default useRefreshAuthToken;
