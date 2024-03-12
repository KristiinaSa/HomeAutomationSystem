import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../../components/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import jest from "jest-mock";

describe("Login component", () => {
  test("renders Login component", async () => {
    render(
      <AuthContext.Provider value={{ setIsLoggedIn: jest.fn() }}>
        <ThemeContext.Provider value={{ setTheme: jest.fn() }}>
          <Router>
            <Login />
          </Router>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "test@example.com");
    await waitFor(() => expect(emailInput).toHaveValue("test@example.com"));

    const passwordInput = screen.getByLabelText(/password/i);
    userEvent.type(passwordInput, "password");
    await waitFor(() => expect(passwordInput).toHaveValue("password"));

    const loginButton = screen.getByRole("button", { name: /log in/i });
    expect(loginButton).toBeInTheDocument();

    userEvent.type(emailInput, "test@example.com");
    expect(emailInput).toHaveValue("test@example.com");

    userEvent.type(passwordInput, "password");
    expect(passwordInput).toHaveValue("password");

    userEvent.click(loginButton);
  });
});
