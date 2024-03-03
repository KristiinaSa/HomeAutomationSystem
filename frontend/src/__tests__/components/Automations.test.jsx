import { vi, describe, expect, it, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Automations } from "../../components/Automations/Automations.jsx";
import * as automationServices from "../../services/automationServices.js";

vi.mock("../../services/automationServices.js", () => ({
  getAutomations: vi.fn(),
}));

describe("Automations Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    automationServices.getAutomations.mockResolvedValue(mockAutomations);
  });

  const mockAutomations = [
    {
      id: 1,
      name: "Test Automation 1",
      weekdays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
      time: "22:00",
      active: true,
      type: "timer",
      devices: [
        {
          id: 1,
          name: "Table Lamp",
          type: "Light",
        },
        {
          id: 2,
          name: "Ceiling Lamp",
          type: "Light",
        },
      ],
    },
    {
      id: 2,
      name: "Test Automation 2",
      weekdays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
      time: "22:00",
      active: true,
      type: "timer",
      devices: [
        {
          id: 1,
          name: "Table Lamp",
          type: "Light",
        },
        {
          id: 2,
          name: "Ceiling Lamp",
          type: "Light",
        },
      ],
    },
  ];

  it("renders automation container", () => {
    render(
      <Router>
        <Automations />
      </Router>
    );
    expect(screen.getByTestId("automation-container")).toBeInTheDocument();
  });

  it("renders timer automation card", async () => {
    render(
      <Router>
        <Automations />
      </Router>
    );
    await screen.findByTestId("timer-automation-1");
  });

  it('renders "Create new automation" button and responds to click events', async () => {
    render(
      <Router>
        <Automations />
      </Router>
    );

    fireEvent.click(screen.getByTestId("create-automation-button"));

    await waitFor(() => {
      expect(window.location.pathname).toBe("/automations/new");
    });
  });
});
