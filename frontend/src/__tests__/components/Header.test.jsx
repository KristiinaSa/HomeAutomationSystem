import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../context/AuthContext";
import { LanguageContext } from "../../context/LanguageContext.jsx";
import Header from "../../components/Header";
import { test, expect } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n-test.js";
import { languageContextValue } from "../../utils/languageTestSetup.js";

test("renders menu items for logged in users in english, japanese and finnish", async () => {
  const authContextValue = { isLoggedIn: true, role: "owner" };
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
  expect(screen.getByText("Add Automation")).toBeInTheDocument();
  expect(screen.getByText("Add Room")).toBeInTheDocument();
  expect(screen.getByText("Add Users")).toBeInTheDocument();

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
  expect(screen.getByText("追加 オ－トメ－ション")).toBeInTheDocument();
  expect(screen.getByText("追加 部屋")).toBeInTheDocument();
  expect(screen.getByText("追加 ユーザー")).toBeInTheDocument();

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
  expect(screen.getByText("Lisää Automaatio")).toBeInTheDocument();
  expect(screen.getByText("Lisää Huone")).toBeInTheDocument();
  expect(screen.getByText("Lisää Käyttäjät")).toBeInTheDocument();
});

test("renders menu items for logged out users", () => {
  const authContextValue = { isLoggedIn: false };
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
