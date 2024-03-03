/* eslint-env jest */
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { SensorAutomationCard } from "../../components/Automations/SensorAutomationCard.jsx";

describe("TimerAutomationCard", () => {
  it("renders correctly", () => {
    const mockAutomation = {
      id: 5,
      name: "Automation 5",
      isDisabled: true,
      type: "sensor",
      value: 20,
      action: "Turn on",
      sensor: {
        id: 1,
        name: "Temperature",
        type: "temperature",
      },

      devices: [
        {
          id: 1,
          name: "Bathroom Light",
          type: "light",
        },
        {
          id: 2,
          name: "Bedroom Light",
          type: "light",
        },
      ],
    };
    render(
      <Router>
        <SensorAutomationCard automation={mockAutomation} />
      </Router>
    );
    const cardElement = screen.getByTestId("automation-card");
    expect(cardElement).toBeInTheDocument();

    const nameElement = screen.getByTestId("automation-name");
    expect(nameElement).toBeInTheDocument();

    const sensorElement = screen.getByTestId("automation-sensor");
    expect(sensorElement).toBeInTheDocument();

    const statusElement = screen.getByTestId("automation-status");
    expect(statusElement).toBeInTheDocument();

    const actionElement = screen.getByTestId("automation-action");
    expect(actionElement).toBeInTheDocument();

    const editButtonElement = screen.getByTestId("edit-button");
    expect(editButtonElement).toBeInTheDocument();
  });
});
