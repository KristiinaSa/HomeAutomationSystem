import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    load: "languageOnly",
    backend: {
      loadPath: `http://localhost:${
        import.meta.env.VITE_PROXY_PORT
      }/api/v1/languages/translations?lng={{lng}}`,
    },
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
