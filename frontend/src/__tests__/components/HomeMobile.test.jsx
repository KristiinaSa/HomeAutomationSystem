import { vi, it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CategoriesContext } from "../../context/CategoriesContext";
import { RoomContext } from "../../context/RoomContext";
import { DeviceContext } from "../../context/DeviceContext";
import HomeMobile from "../../components/HomeMobile";

describe("HomeMobile component", () => {
it("renders HomeMobile component", () => {
  const categoriesContextValue = { categories: [] };
  const roomContextValue = { rooms: [], errorMessage: null };
  const deviceContextValue = {
    devices: [],
    setDevices: vi.fn(),
    errorMsg: null,
  };

  render(
    <CategoriesContext.Provider value={categoriesContextValue}>
      <RoomContext.Provider value={roomContextValue}>
        <DeviceContext.Provider value={deviceContextValue}>
          <Router>
            <HomeMobile />
          </Router>
        </DeviceContext.Provider>
      </RoomContext.Provider>
    </CategoriesContext.Provider>
  );

  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Rooms")).toBeInTheDocument();
});
});