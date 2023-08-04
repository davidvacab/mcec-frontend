import { createRefresh } from "react-auth-kit";
import { RefreshTokenCallbackResponse } from "react-auth-kit/dist/types";
import APIClient from "./api-client";

const apiClient = new APIClient<{ access: string }>("/auth/jwt/refresh/");

const refreshApi = createRefresh({
  interval: 10,
  refreshApiCallback: async ({ refreshToken }) => {
    const res = await apiClient
      .post({ refresh: refreshToken })
      .then((response) => {
        return {
          isSuccess: true,
          newAuthToken: response.data.access,
          newAuthTokenExpireIn: 10,
        } as RefreshTokenCallbackResponse;
      })
      .catch(() => {
        return { isSuccess: false } as RefreshTokenCallbackResponse;
      });
    return res;
  },
});

export default refreshApi;
