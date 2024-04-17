import { describe, it, expect, vi, beforeEach } from "vitest";
import { getByTestId, render, screen } from "@testing-library/react";
import RoomInformation from "../../components/RoomInformation";
import { RoomContext } from "../../context/RoomContext";
import { DeviceProvider } from "../../context/DeviceContext.jsx";
import { AuthProvider } from "../../context/AuthContext.jsx";
import { LanguageContext } from "../../context/LanguageContext.jsx";
import {
  languages,
  languageContextValue,
} from "../../utils/languageTestSetup.js";

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
              <RoomInformation />
            </RoomContext.Provider>
          </DeviceProvider>
        </LanguageContext.Provider>
      </AuthProvider>
    );

    // Assertions
    expect(screen.getByTestId("room-container")).toBeInTheDocument();
  });
});
