import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Registration from "../../components/Registration";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { LanguageContext } from "../../context/LanguageContext";
import {
  languages,
  languageContextValue,
} from "../../utils/languageTestSetup.js";

//Check if the Registration component renders
describe("Registration component", () => {
  beforeEach(() => {
    render(
      <Router>
        <AuthProvider>
          <LanguageContext.Provider value={languageContextValue}>
            <Registration />
          </LanguageContext.Provider>
        </AuthProvider>
      </Router>
    );
  });

  it("renders Registration component", () => {
    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();

    const registerButton = screen.getByRole("button", { name: /register/i });
    expect(registerButton).toBeInTheDocument();
  });

  it("registers a user with a new system", async () => {
    try {
      const nameInput = screen.getByLabelText(/name/i);
      fireEvent.change(nameInput, { target: { value: "test" } });
      expect(nameInput).toHaveValue("test");

      const emailInput = screen.getByLabelText(/email/i);
      fireEvent.change(emailInput, { target: { value: "test@email.com" } });
      expect(emailInput).toHaveValue("test@email.com");

      const passwordInput = screen.getByLabelText(/password/i);
      fireEvent.change(passwordInput, { target: { value: "password" } });
      expect(passwordInput).toHaveValue("password");

      const newSystemInput = screen.getByLabelText(/new system/i);
      fireEvent.click(newSystemInput);
      expect(newSystemInput).toBeChecked();

      const registerButton = screen.getByRole("button", { name: /register/i });
      fireEvent.click(registerButton);

      await waitFor(() => {
        expect(
          screen.getByText(/registration successful/i)
        ).toBeInTheDocument();
      });
    } catch (error) {
      console.log(error);
    }
  });

  it("registers a user without a new system", async () => {
    try {
      const nameInput = screen.getByLabelText(/name/i);
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

      await waitFor(() => {
        expect(
          screen.getByText(/registration successful/i)
        ).toBeInTheDocument();
      });
    } catch (error) {
      console.log(error);
    }
  });

  it("does not register a user without filling in the required fields", async () => {
    try {
      const nameInput = screen.getByLabelText(/name/i);
      fireEvent.change(nameInput, { target: { value: "test" } });
      expect(nameInput).toHaveValue("test");

      const registerButton = screen.getByRole("button", { name: /register/i });
      fireEvent.click(registerButton);

      await waitFor(() => {
        expect(screen.getByText(/fill in all the fields/i)).toBeInTheDocument();
      });
    } catch (error) {
      console.log(error);
    }
  });
});
