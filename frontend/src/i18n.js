import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationJP from "./locales/jp/translation.json";
import translationFI from "./locales/fi/translation.json";
import commonTranslations from "./locales/commonTranslations.json";

const resources = {
  en: {
    translation: { ...translationEN, ...commonTranslations },
  },
  jp: {
    translation: { ...translationJP, ...commonTranslations },
  },
  fi: {
    translation: { ...translationFI, ...commonTranslations },
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: true,
    detection: {
      order: ["localStorage", "navigator"],
      cache: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
