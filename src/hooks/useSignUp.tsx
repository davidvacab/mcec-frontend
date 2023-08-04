import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import UserSignUp from "../entities/UserSignUp";
import User from "../entities/User";

const apiClient = new APIClient<UserSignUp, User>("/auth/users/");

export const useSignUp = () => {
  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: (userRegisterData: UserSignUp) =>
      apiClient.post(userRegisterData),
  });
};

export default useSignUp;
