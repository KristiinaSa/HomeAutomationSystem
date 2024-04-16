import i18nInstance from "../i18n-test";
import { vi } from "vitest";
import { DateTime } from "luxon";

export const i18n = i18nInstance;

export const languages = [
  { id: 1, code: "en", name: "English" },
  { id: 2, code: "jp", name: "日本語" },
  { id: 3, code: "fi", name: "Suomi" },
];

const getLocaleForDate = (code) => {
  let locale = code.includes("-") ? code.split("-")[0] : code;
  if (locale === "jp") {
    locale = "ja";
  }
  return locale;
};

export const languageContextValue = {
  languages,
  selectedLanguage: "en",
  handleLanguageChange: (newLanguage) => {
    languageContextValue.selectedLanguage = newLanguage;
    i18n.changeLanguage(newLanguage);
  },
  updateLanguage: vi.fn(),
  t: i18n.t,
  formatDateTime: (dateString) => {
    const locale = getLocaleForDate(languageContextValue.selectedLanguage);
    const date = DateTime.fromISO(dateString).setLocale(locale);
    return date.toLocaleString(DateTime.DATETIME_MED);
  },
};
