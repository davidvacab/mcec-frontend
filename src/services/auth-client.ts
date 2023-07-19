import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/auth",
});

interface LoginForm {
  username: string;
  password: string;
}

interface RefreshTokens {
  authToken: string | undefined;
  refreshToken: string | undefined;
}

class AuthClient {
  login = async (formValues: LoginForm) => {
    const res = await axiosInstance.post("/jwt/create", formValues);
    return res.data;
  };

  refresh = async ({ authToken, refreshToken }: RefreshTokens) => {
    const res = await axiosInstance.post(
      "/jwt/refresh",
      { refresh: refreshToken },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    return res.data;
  };
  me = async (authToken: string | undefined) => {
    return await axiosInstance
      .get("/users/me", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => res.data)
      .catch((error) => console.log(error));
  };
}

export default AuthClient;
