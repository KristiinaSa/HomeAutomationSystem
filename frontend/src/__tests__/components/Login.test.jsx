import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Login from "../../components/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { describe, vi, it, expect } from "vitest";

describe("Login component", () => {
  it("renders Login component", async () => {
    render(
      <AuthContext.Provider value={{ setIsLoggedIn: vi.fn() }}>
        <ThemeContext.Provider value={{ setTheme: vi.fn() }}>
          <Router>
            <Login />
          </Router>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    await waitFor(() => expect(emailInput).toHaveValue("test@example.com"));

    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    await waitFor(() => expect(passwordInput).toHaveValue("password"));

    const loginButton = screen.getByRole("button", { name: /log in/i });
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);
    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password");

    fireEvent.click(loginButton);
  });
});
