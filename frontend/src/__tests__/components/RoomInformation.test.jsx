import React from "react";
import { getByTestId, render, screen } from "@testing-library/react";
import RoomInformation from "../../components/RoomInformation";
import { RoomContext } from "../../context/RoomContext";

test("renders RoomInformation component", () => {
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
  const { getByTestId } = render(
    <RoomContext.Provider value={{ rooms }}>
      <RoomInformation />
    </RoomContext.Provider>
  );

  // Assertions
  expect(screen.getByTestId("room-container")).toBeInTheDocument();
});