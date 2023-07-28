import { UserSignUp } from "./UserSignUp";

export interface UserAuthToken {
  access: string;
  refresh: string;
  user: UserSignUp;
}
