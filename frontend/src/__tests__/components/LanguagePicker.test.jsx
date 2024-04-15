import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguagePicker } from "../../components/LanguagePicker";
import { AuthContext } from "../../context/AuthContext.jsx";
import { LanguageContext } from "../../context/LanguageContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import {
  languages,
  languageContextValue,
} from "../../utils/languageTestSetup.js";

test("renders LanguagePicker component", () => {
  render(
    <AuthContext.Provider value={{ isLoggedIn: true }}>
      <LanguageContext.Provider value={languageContextValue}>
        <Router>
          <LanguagePicker />
        </Router>
      </LanguageContext.Provider>
    </AuthContext.Provider>
  );

  const languagePickerElement = screen.getByTestId("language-picker");
  expect(languagePickerElement).toBeInTheDocument();

  const titleElement = screen.getByText("Choose a language:");
  expect(titleElement).toBeInTheDocument();
});

test("renders all languages", () => {
  render(
    <AuthContext.Provider value={{ isLoggedIn: true }}>
      <LanguageContext.Provider value={languageContextValue}>
        <Router>
          <LanguagePicker />
        </Router>
      </LanguageContext.Provider>
    </AuthContext.Provider>
  );

  languages.forEach((language) => {
    const languageElement = screen.getByText(language.name);
    expect(languageElement).toBeInTheDocument();
  });
});

test("changes language to japanese when a new option is selected", async () => {
  const { rerender } = render(
    <AuthContext.Provider value={{ isLoggedIn: true }}>
      <LanguageContext.Provider value={languageContextValue}>
        <Router>
          <LanguagePicker />
        </Router>
      </LanguageContext.Provider>
    </AuthContext.Provider>
  );

  const languagePickerElement = screen.getByTestId("language-picker");
  fireEvent.change(languagePickerElement, { target: { value: "jp" } });

  languageContextValue.selectedLanguage = "jp";

  rerender(
    <AuthContext.Provider value={{ isLoggedIn: true }}>
      <LanguageContext.Provider value={languageContextValue}>
        <Router>
          <LanguagePicker />
        </Router>
      </LanguageContext.Provider>
    </AuthContext.Provider>
  );

  const jpTitleElement = screen.getByText("言語を選択:");
  expect(jpTitleElement).toBeInTheDocument();
});

test("changes language to finnish when a new option is selected", async () => {
  const { rerender } = render(
    <AuthContext.Provider value={{ isLoggedIn: true }}>
      <LanguageContext.Provider value={languageContextValue}>
        <Router>
          <LanguagePicker />
        </Router>
      </LanguageContext.Provider>
    </AuthContext.Provider>
  );

  const languagePickerElement = screen.getByTestId("language-picker");
  fireEvent.change(languagePickerElement, { target: { value: "fi" } });

  languageContextValue.selectedLanguage = "fi";

  rerender(
    <AuthContext.Provider value={{ isLoggedIn: true }}>
      <LanguageContext.Provider value={languageContextValue}>
        <Router>
          <LanguagePicker />
        </Router>
      </LanguageContext.Provider>
    </AuthContext.Provider>
  );

  const fiTitleElement = screen.getByText("Valitse kieli:");
  expect(fiTitleElement).toBeInTheDocument();
});
