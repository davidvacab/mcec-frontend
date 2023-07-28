import { Church } from "./Church";
import { Profile } from "./Profile";

export interface UserSignUp {
  username?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  profile: Profile;
  church: Church;
}
