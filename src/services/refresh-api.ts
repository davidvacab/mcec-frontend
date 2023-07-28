import { createRefresh } from "react-auth-kit";
import { RefreshTokenCallbackResponse } from "react-auth-kit/dist/types";
import useRefreshAuthToken from "../hooks/useRefreshAuthToken";

const refreshApi = createRefresh({
  interval: 10,
  refreshApiCallback: async ({ refreshToken }) => {
    const { mutate: refresh, isSuccess, data } = useRefreshAuthToken();
    refresh(refreshToken);
    if (isSuccess)
      return {
        isSuccess: true,
        newAuthToken: data.access,
        newAuthTokenExpireIn: 10,
      } as RefreshTokenCallbackResponse;
    else return { isSuccess: false } as RefreshTokenCallbackResponse;
    // await authClient
    //   .refreshAuth(refreshToken)
    //   .then((res) => {
    //     return {
    //       isSuccess: true,
    //       newAuthToken: res.data.access,
    //       newAuthTokenExpireIn: 10,
    //     } as RefreshTokenCallbackResponse;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     return {
    //       isSuccess: false,
    //     } as RefreshTokenCallbackResponse;
    //   });
  },
});

export default refreshApi;
