import CountryNames from "./CountryNames";

export default interface Church {
  minister_name: string;
  church_name: string;
  city: string;
  state: string;
  country: typeof CountryNames;
}
