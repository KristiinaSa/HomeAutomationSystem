import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/Header";
import { test, expect } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n.js";

test("renders menu items for logged in users", () => {
  const authContextValue = { isLoggedIn: true };
  render(
    <I18nextProvider i18n={i18n}>
      <AuthContext.Provider value={authContextValue}>
        <Router>
          <Header />
        </Router>
      </AuthContext.Provider>
    </I18nextProvider>
  );

  expect(screen.getByText("Add Device")).toBeInTheDocument();
  expect(screen.getByText("Accessories")).toBeInTheDocument();
  expect(screen.getByText("Add Automation")).toBeInTheDocument();
  expect(screen.getByText("Add Room")).toBeInTheDocument();
  expect(screen.getByText("Add Users")).toBeInTheDocument();
  expect(screen.getByText("Log out")).toBeInTheDocument();
});

test("renders menu items for logged out users", () => {
  const authContextValue = { isLoggedIn: false };
  render(
    <AuthContext.Provider value={authContextValue}>
      <Router>
        <Header />
      </Router>
    </AuthContext.Provider>
  );

  expect(screen.getByText("Log in")).toBeInTheDocument();
  expect(screen.getByText("Register")).toBeInTheDocument();
});
