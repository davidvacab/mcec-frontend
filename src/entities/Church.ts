import CountryCodes from "./Countries";

export default interface Church {
  minister_name: string;
  church_name: string;
  city: string;
  state: string;
  country: (typeof CountryCodes)[number];
}
