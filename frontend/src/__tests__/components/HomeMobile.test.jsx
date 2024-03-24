import { vi, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CategoriesContext } from "../../context/CategoriesContext";
import { RoomContext } from "../../context/RoomContext";
import { DeviceContext } from "../../context/DeviceContext";
import HomeMobile from "../../components/HomeMobile";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n.js";

test("renders HomeMobile component", () => {
  const categoriesContextValue = { categories: [] };
  const roomContextValue = { rooms: [], errorMessage: null };
  const deviceContextValue = {
    devices: [],
    setDevices: vi.fn(),
    errorMsg: null,
  };

  render(
    <I18nextProvider i18n={i18n}>
      <CategoriesContext.Provider value={categoriesContextValue}>
        <RoomContext.Provider value={roomContextValue}>
          <DeviceContext.Provider value={deviceContextValue}>
            <Router>
              <HomeMobile />
            </Router>
          </DeviceContext.Provider>
        </RoomContext.Provider>
      </CategoriesContext.Provider>
    </I18nextProvider>
  );

  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Rooms")).toBeInTheDocument();
});
