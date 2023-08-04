import CountryPhoneCodes from "./CountryPhoneCodes";
import MemberRoles from "./MemberRoles";
import MemberVoiceTypes from "./MemberVoiceTypes";

export default interface Profile {
  first_name: string;
  last_name: string;
  bio?: string;
  profile_picture?: File;
  birthdate: string;
  phone_area_code: typeof CountryPhoneCodes;
  phone_number: string;
  voice_type: typeof MemberVoiceTypes;
  role: typeof MemberRoles;
}
