import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import commonES from "./locales/es/common.json";
import validationES from "./locales/es/validation.json";
import homeES from "./locales/es/home.json";
import membersES from "./locales/es/members.json";
import hymnbookES from "./locales/es/hymnbook.json";
import zodES from "zod-i18n-map/locales/es/zod.json";
import commonEN from "./locales/en/common.json";
import validationEN from "./locales/en/validation.json";
import homeEN from "./locales/en/home.json";
import membersEN from "./locales/en/members.json";
import hymnbookEN from "./locales/en/hymnbook.json";

const resources = {
  en: {
    common: commonEN,
    validation: validationEN,
    home: homeEN,
    members: membersEN,
    hymnbook: hymnbookEN,
  },
  es: {
    common: commonES,
    validation: validationES,
    home: homeES,
    members: membersES,
    hymnbook: hymnbookES,
    zod: zodES,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
  });
