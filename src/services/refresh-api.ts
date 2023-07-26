import { createRefresh } from "react-auth-kit";
import { RefreshTokenCallbackResponse } from "react-auth-kit/dist/types";
import AuthClient from "./auth-client";

const authClient = new AuthClient();

const refreshApi = createRefresh({
  interval: 10, // Refreshs the token in every 10 minutes
  refreshApiCallback: async ({ refreshToken }) =>
    await authClient
      .refresh(refreshToken)
      .then((data) => {
        return {
          isSuccess: true,
          newAuthToken: data.access,
          newAuthTokenExpireIn: 10,
        } as RefreshTokenCallbackResponse;
      })
      .catch((error) => {
        console.log(error);
        return {
          isSuccess: false,
        } as RefreshTokenCallbackResponse;
      }),
});

export default refreshApi;
