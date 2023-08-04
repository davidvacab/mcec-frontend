import UserSignUp from "./UserSignUp";

export default interface UserAuthToken {
  access: string;
  refresh: string;
  user: UserSignUp;
}
