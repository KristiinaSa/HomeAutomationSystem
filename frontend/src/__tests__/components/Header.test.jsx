import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../context/AuthContext";
import { LanguageContext } from "../../context/LanguageContext.jsx";
import Header from "../../components/Header";
import { test, expect } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n.js";

test("renders menu items for logged in users in english, japanese and finnish", async () => {
  const authContextValue = { isLoggedIn: true };
  const languageContextValue = {
    languages: [],
    selectedLanguage: "en",
    handleLanguageChange: vi.fn(),
    updateLanguage: vi.fn(),
  };
  const { rerender } = render(
    <I18nextProvider i18n={i18n}>
      <AuthContext.Provider value={authContextValue}>
        <LanguageContext.Provider value={languageContextValue}>
          <Router>
            <Header />
          </Router>
        </LanguageContext.Provider>
      </AuthContext.Provider>
    </I18nextProvider>
  );

  expect(screen.getByText("Add Device")).toBeInTheDocument();
  expect(screen.getByText("Accessories")).toBeInTheDocument();
  expect(screen.getByText("Add Automation")).toBeInTheDocument();
  expect(screen.getByText("Add Room")).toBeInTheDocument();
  expect(screen.getByText("Add Users")).toBeInTheDocument();
  expect(screen.getByText("Log out")).toBeInTheDocument();

  await i18n.changeLanguage("jp");
  rerender(
    <I18nextProvider i18n={i18n}>
      <AuthContext.Provider value={authContextValue}>
        <LanguageContext.Provider value={languageContextValue}>
          <Router>
            <Header />
          </Router>
        </LanguageContext.Provider>
      </AuthContext.Provider>
    </I18nextProvider>
  );

  expect(screen.getByText("追加 デバイス")).toBeInTheDocument();
  expect(screen.getByText("アクセサリ")).toBeInTheDocument();
  expect(screen.getByText("追加 オ－トメ－ション")).toBeInTheDocument();
  expect(screen.getByText("追加 部屋")).toBeInTheDocument();
  expect(screen.getByText("追加 ユーザー")).toBeInTheDocument();
  expect(screen.getByText("ログアウト")).toBeInTheDocument();

  await i18n.changeLanguage("fi");
  rerender(
    <I18nextProvider i18n={i18n}>
      <AuthContext.Provider value={authContextValue}>
        <LanguageContext.Provider value={languageContextValue}>
          <Router>
            <Header />
          </Router>
        </LanguageContext.Provider>
      </AuthContext.Provider>
    </I18nextProvider>
  );

  expect(screen.getByText("Lisää Laite")).toBeInTheDocument();
  expect(screen.getByText("Lisävarusteet")).toBeInTheDocument();
  expect(screen.getByText("Lisää Automaatio")).toBeInTheDocument();
  expect(screen.getByText("Lisää Huone")).toBeInTheDocument();
  expect(screen.getByText("Lisää Käyttäjät")).toBeInTheDocument();
  expect(screen.getByText("Kirjaudu ulos")).toBeInTheDocument();
});

test("renders menu items for logged out users", () => {
  const authContextValue = { isLoggedIn: false };
  const languageContextValue = {
    languages: [],
    selectedLanguage: "en",
    handleLanguageChange: vi.fn(),
    updateLanguage: vi.fn(),
  };
  render(
    <I18nextProvider i18n={i18n}>
      <AuthContext.Provider value={authContextValue}>
        <LanguageContext.Provider value={languageContextValue}>
          <Router>
            <Header />
          </Router>
        </LanguageContext.Provider>
      </AuthContext.Provider>
    </I18nextProvider>
  );
});
