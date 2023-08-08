import CountryPhoneCodes from "./CountryPhoneCodes";
import MemberRoles from "./MemberRoles";
import MemberVoiceTypes from "./MemberVoiceTypes";

export default interface Profile {
  first_name: string;
  last_name: string;
  bio?: string | null;
  profile_picture: string;
  profile_picture_file?: FileList;
  birthdate: string;
  phone_area_code: (typeof CountryPhoneCodes)[number];
  phone_number: string;
  voice_type: (typeof MemberVoiceTypes)[number];
  role: (typeof MemberRoles)[number];
}

export interface ProfileInput {
  first_name: string;
  last_name: string;
  bio?: string | null;
  profile_picture?: File;
  birthdate: string;
  phone_area_code: (typeof CountryPhoneCodes)[number];
  phone_number: string;
  voice_type: (typeof MemberVoiceTypes)[number];
  role: (typeof MemberRoles)[number];
}
