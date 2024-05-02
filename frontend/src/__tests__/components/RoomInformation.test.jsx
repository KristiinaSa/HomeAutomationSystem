import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RoomInformation from "../../components/RoomInformation";
import { RoomContext } from "../../context/RoomContext";
import { DeviceProvider } from "../../context/DeviceContext.jsx";
import { AuthProvider } from "../../context/AuthContext.jsx";
import { LanguageContext } from "../../context/LanguageContext.jsx";
import { languageContextValue } from "../../utils/languageTestSetup.js";
import { MemoryRouter } from "react-router-dom";

describe("renders RoomInformation component", () => {
  // Hardcoded room data
  const rooms = [
    {
      id: 1,
      roomName: "Living Room",
      devices: [
        { type: "light", status: "on" },
        { type: "light", status: "off" },
      ],
    },
    // Add more rooms as needed
  ];

  // Render RoomInformation component with hardcoded room data
  it("renders RoomInformation component", () => {
    render(
      <AuthProvider>
        <LanguageContext.Provider value={languageContextValue}>
          <DeviceProvider>
            <RoomContext.Provider value={{ rooms }}>
              <MemoryRouter>
                <RoomInformation />
              </MemoryRouter>
            </RoomContext.Provider>
          </DeviceProvider>
        </LanguageContext.Provider>
      </AuthProvider>
    );

    // Assertions
    expect(screen.getByTestId("room-container")).toBeInTheDocument();
  });
});
