import axios from "axios";
import {
  LoginFormData,
  RefreshTokens,
  RegisterFormData,
  ActivateTokens,
} from "../entities/types";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/auth",
});

class AuthClient {
  login = async (formValues: LoginFormData) => {
    return await axiosInstance
      .post("/jwt/create/", formValues)
      .then((res) => res.data);
  };

  refresh = async ({ authToken, refreshToken }: RefreshTokens) => {
    return await axiosInstance
      .post(
        "/jwt/refresh/",
        { refresh: refreshToken },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((res) => res.data);
  };
  register = async (formData: RegisterFormData) => {
    return await axiosInstance.post("/users/", formData).then((res) => res);
  };
  activate = async (tokens: ActivateTokens) => {
    return await axiosInstance
      .post("/users/activation/", tokens)
      .then((res) => res);
  };
  me = async (authToken: string | undefined) => {
    return await axiosInstance
      .get("/users/me/", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => res.data);
  };
}

export default AuthClient;
