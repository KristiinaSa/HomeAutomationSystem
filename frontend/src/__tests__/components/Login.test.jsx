import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Login from "../../components/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { test, expect, vi } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n.js";

test("renders Login component", async () => {
  render(
    <I18nextProvider i18n={i18n}>
      <AuthContext.Provider value={{ setIsLoggedIn: vi.fn() }}>
        <ThemeContext.Provider value={{ setTheme: vi.fn() }}>
          <Router>
            <Login />
          </Router>
        </ThemeContext.Provider>
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
