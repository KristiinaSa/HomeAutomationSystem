import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/Header";
import { BrowserRouter as Router } from "react-router-dom";

test("renders menu items for logged in users", () => {
  const authContextValue = { isLoggedIn: true };
  render(
    <AuthContext.Provider value={authContextValue}>
      <Router>
        <Header />
      </Router>
    </AuthContext.Provider>
  );

  expect(screen.getByText("Add device")).toBeInTheDocument();
  expect(screen.getByText("Accessories")).toBeInTheDocument();
  expect(screen.getByText("Add automation")).toBeInTheDocument();
  expect(screen.getByText("Add room")).toBeInTheDocument();
  expect(screen.getByText("Add users")).toBeInTheDocument();
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
