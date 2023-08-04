import Church from "./Church";
import Profile from "./Profile";

export default interface UserSignUp {
  username: string;
  email: string;
  password: string;
  re_password: string;
  profile: Profile;
  church: Church;
}
