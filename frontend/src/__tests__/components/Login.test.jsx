import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Login from "../../components/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { test, expect, vi } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n-test.js";
import { LanguageContext } from "../../context/LanguageContext.jsx";

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

test("renders Login component", async () => {
  render(
    <I18nextProvider i18n={i18n}>
      <AuthContext.Provider value={{ isLoggedIn: false }}>
        <LanguageContext.Provider value={languageContextValue}>
          <ThemeContext.Provider value={{ theme: "light" }}>
            <Router>
              <Login />
            </Router>
          </ThemeContext.Provider>
        </LanguageContext.Provider>
      </AuthContext.Provider>
    </I18nextProvider>
  );

  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  await waitFor(() => expect(emailInput).toHaveValue("test@example.com"));

  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: "password" } });
  await waitFor(() => expect(passwordInput).toHaveValue("password"));

  const loginButton = screen.getByRole("button", { name: /log in/i });
  expect(loginButton).toBeInTheDocument();

  fireEvent.click(loginButton);
  expect(emailInput).toHaveValue("test@example.com");
  expect(passwordInput).toHaveValue("password");

  fireEvent.click(loginButton);
});
