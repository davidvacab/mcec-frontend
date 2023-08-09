import Profile from "./Profile";

export default interface UserAuthToken {
  access: string;
  refresh: string;
  user: {
    username: string;
    email: string;
    profile: Profile;
  };
}
