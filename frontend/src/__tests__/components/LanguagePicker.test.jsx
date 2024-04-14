import { vi, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguagePicker } from "../../components/LanguagePicker";
import { AuthContext } from "../../context/AuthContext.jsx";
import { LanguageContext } from "../../context/LanguageContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n-test.js";

const languages = [
  { id: 1, code: "en", name: "English" },
  { id: 2, code: "jp", name: "日本語" },
  { id: 3, code: "fi", name: "Suomi" },
];

const languageContextValue = {
  languages,
  selectedLanguage: "en",
  handleLanguageChange: (newLanguage) => {
    languageContextValue.selectedLanguage = newLanguage;
    i18n.changeLanguage(newLanguage);
  },
  updateLanguage: vi.fn(),
  t: i18n.t,
};

test("renders LanguagePicker component", () => {
  render(
    <I18nextProvider i18n={i18n}>
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <LanguageContext.Provider value={languageContextValue}>
          <Router>
            <LanguagePicker />
          </Router>
        </LanguageContext.Provider>
      </AuthContext.Provider>
    </I18nextProvider>
  );

  const languagePickerElement = screen.getByTestId("language-picker");
  expect(languagePickerElement).toBeInTheDocument();

  const titleElement = screen.getByText("Choose a language:");
  expect(titleElement).toBeInTheDocument();
});

test("renders all languages", () => {
  render(
    <I18nextProvider i18n={i18n}>
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <LanguageContext.Provider value={languageContextValue}>
          <Router>
            <LanguagePicker />
          </Router>
        </LanguageContext.Provider>
      </AuthContext.Provider>
    </I18nextProvider>
  );

  languages.forEach((language) => {
    const languageElement = screen.getByText(language.name);
    expect(languageElement).toBeInTheDocument();
  });
});

test("changes language to japanese when a new option is selected", async () => {
  const { rerender } = render(
    <I18nextProvider i18n={i18n}>
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <LanguageContext.Provider value={languageContextValue}>
          <Router>
            <LanguagePicker />
          </Router>
        </LanguageContext.Provider>
      </AuthContext.Provider>
    </I18nextProvider>
  );

  const languagePickerElement = screen.getByTestId("language-picker");
  fireEvent.change(languagePickerElement, { target: { value: "jp" } });

  languageContextValue.selectedLanguage = "jp";

  rerender(
    <I18nextProvider i18n={i18n}>
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <LanguageContext.Provider value={languageContextValue}>
          <Router>
            <LanguagePicker />
          </Router>
        </LanguageContext.Provider>
      </AuthContext.Provider>
    </I18nextProvider>
  );

  const jpTitleElement = screen.getByText("言語を選択:");
  expect(jpTitleElement).toBeInTheDocument();
});

test("changes language to finnish when a new option is selected", async () => {
  const { rerender } = render(
    <I18nextProvider i18n={i18n}>
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <LanguageContext.Provider value={languageContextValue}>
          <Router>
            <LanguagePicker />
          </Router>
        </LanguageContext.Provider>
      </AuthContext.Provider>
    </I18nextProvider>
  );

  const languagePickerElement = screen.getByTestId("language-picker");
  fireEvent.change(languagePickerElement, { target: { value: "fi" } });

  languageContextValue.selectedLanguage = "fi";

  rerender(
    <I18nextProvider i18n={i18n}>
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <LanguageContext.Provider value={languageContextValue}>
          <Router>
            <LanguagePicker />
          </Router>
        </LanguageContext.Provider>
      </AuthContext.Provider>
    </I18nextProvider>
  );

  const fiTitleElement = screen.getByText("Valitse kieli:");
  expect(fiTitleElement).toBeInTheDocument();
});
