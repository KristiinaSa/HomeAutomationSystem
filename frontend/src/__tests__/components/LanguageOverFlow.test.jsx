import { vi, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LanguageOverflow from "../../components/LanguageOverflow";
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

test("renders LanguageOverflow component", () => {
  render(
    <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider value={languageContextValue}>
        <Router>
          <LanguageOverflow />
        </Router>
      </LanguageContext.Provider>
    </I18nextProvider>
  );

  const languageOverflowElement = screen.getByTestId("language-overflow");
  expect(languageOverflowElement).toBeInTheDocument();
});

test("renders all languages when menu is open", () => {
  render(
    <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider value={languageContextValue}>
        <Router>
          <LanguageOverflow />
        </Router>
      </LanguageContext.Provider>
    </I18nextProvider>
  );

  const languageOverflowElement = screen.getByTestId("language-overflow");
  fireEvent.click(languageOverflowElement);

  languages.forEach((language) => {
    const languageElements = screen.getAllByText(language.name);
    languageElements.forEach((languageElement) => {
      expect(languageElement).toBeInTheDocument();
    });
  });
});

test("japanese is selected", async () => {
  const { rerender } = render(
    <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider value={languageContextValue}>
        <Router>
          <LanguageOverflow />
        </Router>
      </LanguageContext.Provider>
    </I18nextProvider>
  );

  const languageOverflowElement = screen.getByTestId("language-overflow");
  fireEvent.click(languageOverflowElement);

  const jpOptionElements = screen.getByText("日本語");
  fireEvent.click(jpOptionElements); 

  languageContextValue.selectedLanguage = "jp";

  rerender(
    <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider value={languageContextValue}>
        <Router>
          <LanguageOverflow />
        </Router>
      </LanguageContext.Provider>
    </I18nextProvider>
  );

  const jpTitleElements = screen.getAllByText("日本語");
  expect(jpTitleElements[0]).toBeInTheDocument();
});

test("finnish is selected", async () => {
    const { rerender } = render(
      <I18nextProvider i18n={i18n}>
        <LanguageContext.Provider value={languageContextValue}>
          <Router>
            <LanguageOverflow />
          </Router>
        </LanguageContext.Provider>
      </I18nextProvider>
    );
  
    const languageOverflowElement = screen.getByTestId("language-overflow");
    fireEvent.click(languageOverflowElement);
  
    const jpOptionElements = screen.getByText("Suomi");
    fireEvent.click(jpOptionElements); 
  
    languageContextValue.selectedLanguage = "fi";
  
    rerender(
      <I18nextProvider i18n={i18n}>
        <LanguageContext.Provider value={languageContextValue}>
          <Router>
            <LanguageOverflow />
          </Router>
        </LanguageContext.Provider>
      </I18nextProvider>
    );
  
    const jpTitleElements = screen.getAllByText("Suomi");
    expect(jpTitleElements[0]).toBeInTheDocument();
  });