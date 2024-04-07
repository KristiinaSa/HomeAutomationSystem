import { vi, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CategoriesContext } from "../../context/CategoriesContext";
import { RoomContext } from "../../context/RoomContext";
import { DeviceContext } from "../../context/DeviceContext";
import { AuthContext } from "../../context/AuthContext.jsx";
import HomeMobile from "../../components/HomeMobile";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n.js";

test("renders HomeMobile component", async () => {
  const categoriesContextValue = { categories: [] };
  const roomContextValue = { rooms: [], errorMessage: null };
  const deviceContextValue = {
    devices: [],
    setDevices: vi.fn(),
    errorMsg: null,
  };

  const authContextValue = {
    isLoggedIn: true,
    setIsLoggedIn: vi.fn(),
    logout: vi.fn(),
    user: {},
    setUser: vi.fn(),
    role: "admin",
    setRole: vi.fn(),
    userId: "1",
    setUserId: vi.fn(),
  };

  const { rerender } = render(
    <I18nextProvider i18n={i18n}>
      <CategoriesContext.Provider value={categoriesContextValue}>
        <RoomContext.Provider value={roomContextValue}>
          <DeviceContext.Provider value={deviceContextValue}>
            <AuthContext.Provider value={{ authContextValue }}>
              <Router>
                <HomeMobile />
              </Router>
            </AuthContext.Provider>
          </DeviceContext.Provider>
        </RoomContext.Provider>
      </CategoriesContext.Provider>
    </I18nextProvider>
  );

  await i18n.changeLanguage("jp");
  rerender(
    <I18nextProvider i18n={i18n}>
      <CategoriesContext.Provider value={categoriesContextValue}>
        <RoomContext.Provider value={roomContextValue}>
          <DeviceContext.Provider value={deviceContextValue}>
            <AuthContext.Provider value={{ authContextValue }}>
              <Router>
                <HomeMobile />
              </Router>
            </AuthContext.Provider>
          </DeviceContext.Provider>
        </RoomContext.Provider>
      </CategoriesContext.Provider>
    </I18nextProvider>
  );

  expect(screen.getByText("ホーム")).toBeInTheDocument();
  expect(screen.getByText("部屋")).toBeInTheDocument();

  await i18n.changeLanguage("fi");
  rerender(
    <I18nextProvider i18n={i18n}>
      <CategoriesContext.Provider value={categoriesContextValue}>
        <RoomContext.Provider value={roomContextValue}>
          <DeviceContext.Provider value={deviceContextValue}>
            <AuthContext.Provider value={{ authContextValue }}>
              <Router>
                <HomeMobile />
              </Router>
            </AuthContext.Provider>
          </DeviceContext.Provider>
        </RoomContext.Provider>
      </CategoriesContext.Provider>
    </I18nextProvider>
  );

  expect(screen.getByText("Etusivu")).toBeInTheDocument();
  expect(screen.getByText("Huoneet")).toBeInTheDocument();
});
