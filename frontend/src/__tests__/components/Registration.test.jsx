import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Registration from "../../components/Registration";
import LanguageOverflow from "../../components/LanguageOverflow";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { LanguageContext } from "../../context/LanguageContext";
import { languageContextValue } from "../../utils/languageTestSetup.js";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n-test.js";

vi.mock("../../services/authService.js", () => ({
  createSystem: vi.fn(),
}));

describe("Registration component", () => {
  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18n}>
        <Router>
          <AuthProvider>
            <LanguageContext.Provider value={languageContextValue}>
              <LanguageOverflow />
              <Registration />
            </LanguageContext.Provider>
          </AuthProvider>
        </Router>
      </I18nextProvider>
    );
  });

  it("renders Registration component", () => {
    const nameInput = screen.getByLabelText("Name");
    expect(nameInput).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();

    const registerButton = screen.getByRole("button", { name: /register/i });
    expect(registerButton).toBeInTheDocument();
  });

  it("registers a user with a new system", async () => {
    const nameInput = screen.getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(nameInput).toHaveValue("test");

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    expect(emailInput).toHaveValue("test@email.com");

    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: "password" } });
    expect(passwordInput).toHaveValue("password");

    const registerButton = screen.getByRole("button", { name: /register/i });
    fireEvent.click(registerButton);

    await waitFor(() => {});
  });

  it("registers a user without a new system", async () => {
    const nameInput = screen.getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(nameInput).toHaveValue("test");

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "email@email.com" } });
    expect(emailInput).toHaveValue("email@email.com");

    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: "password" } });
    expect(passwordInput).toHaveValue("password");

    const registerButton = screen.getByRole("button", { name: /register/i });
    fireEvent.click(registerButton);

    await waitFor(() => {});
  });

  it("does not register a user without filling in the required fields", async () => {
    const nameInput = screen.getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(nameInput).toHaveValue("test");

    const registerButton = screen.getByRole("button", { name: /register/i });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText(/fill in all the fields/i)).toBeInTheDocument();
    });
  });

  it("language changes when a new language is selected", async () => {
    const languageSelect = screen.getByTestId("language-overflow");
    fireEvent.click(languageSelect);

    const fiOption = screen.getByText("Suomi");
    fireEvent.click(fiOption);
    await i18n.changeLanguage("fi");

    render(
      <Router>
        <AuthProvider>
          <LanguageContext.Provider value={languageContextValue}>
            <LanguageOverflow />
            <Registration />
          </LanguageContext.Provider>
        </AuthProvider>
      </Router>
    );
    //expect form to be in Finnish
    expect(screen.getByText("Salasana")).toBeInTheDocument();
  });
});
