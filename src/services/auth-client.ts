import axios from "axios";
import {
  LoginData,
  RegisterData,
  ResetPasswordData,
  SetPasswordData,
  UidTokenData,
} from "../entities/types";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/auth",
});

class AuthClient {
  login = async (formValues: LoginData) => {
    return await axiosInstance
      .post("/jwt/create/", formValues)
      .then((res) => res);
  };

  refreshAuth = async (refreshToken: string | undefined) => {
    return await axiosInstance
      .post("/jwt/refresh/", { refresh: refreshToken })
      .then((res) => res);
  };

  verifyAuth = async (authToken: string | undefined) => {
    return await axiosInstance
      .post("/jwt/verify/", { token: authToken })
      .then((res) => res);
  };

  register = async (formData: RegisterData) => {
    return await axiosInstance.post("/users/", formData).then((res) => res);
  };
  activate = async (tokens: UidTokenData) => {
    return await axiosInstance
      .post("/users/activation/", tokens)
      .then((res) => res);
  };
  resendActivate = async (email: string | undefined) => {
    return await axiosInstance
      .post("/users/resend_activation/", { email })
      .then((res) => res);
  };
  setPassword = async (
    formData: SetPasswordData,
    authToken: string | undefined
  ) => {
    return await axiosInstance
      .post("/users/set_password/", formData, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => res);
  };
  resetPassword = async (email: string | undefined) => {
    return await axiosInstance
      .post("/users/reset_password/", { email })
      .then((res) => res);
  };
  resetPasswordConfirmation = async (data: ResetPasswordData) => {
    return await axiosInstance
      .post("/users/reset_password_confirm/", data)
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
