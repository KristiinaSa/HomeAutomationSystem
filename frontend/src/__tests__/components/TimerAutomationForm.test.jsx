import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act, fireEvent, within } from "@testing-library/react";
import TimerAutomationForm from "../../components/AutomationForm/TimerAutomationForm";
import { BrowserRouter as Router } from "react-router-dom";
import * as accessoryServices from "../../services/accessoryServices.js";

vi.mock("../../services/accessoryServices", () => ({
  getDevices: vi.fn(),
}));

describe("TimerAutomationForm Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    accessoryServices.getDevices.mockResolvedValue(mockDevices);
  });

  const handleSubmit = vi.fn();
  const handleDelete = vi.fn();

  const mockAutomation = {
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
    disabled: true,
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
  };

  const mockDevices = [
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
  ];

  const mockAutomationWithoutId = {
    ...mockAutomation,
    id: undefined,
  };

  it("fetches a timer-based automation", async () => {
    await act(async () => {
      render(
        <Router>
          <TimerAutomationForm
            handleSubmit={handleSubmit}
            automation={mockAutomation}
            handleDelete={handleDelete}
          />
        </Router>
      );
    });

    expect(accessoryServices.getDevices).toHaveBeenCalled();

    mockDevices.forEach((device) => {
      expect(screen.getByText(device.name)).toBeInTheDocument();
    });
  });

  it("calls handleSubmit with the correct arguments when the form is submitted", async () => {
    await act(async () => {
      render(
        <Router>
          <TimerAutomationForm
            handleSubmit={handleSubmit}
            automation={mockAutomation}
            handleDelete={handleDelete}
          />
        </Router>
      );
    });

    fireEvent.submit(screen.getByTestId("timer-automation-form"));
    expect(handleSubmit).toHaveBeenCalledWith(mockAutomationWithoutId, 2);
  });

  it("calls handleDelete when the delete button is clicked", async () => {
    await act(async () => {
      render(
        <Router>
          <TimerAutomationForm
            handleSubmit={handleSubmit}
            automation={mockAutomation}
            handleDelete={handleDelete}
          />
        </Router>
      );
    });

    fireEvent.click(screen.getByTestId("delete-button"));

    expect(handleDelete).toHaveBeenCalledWith(mockAutomation.id);
  });

  it("disables the submit button when the form is not filled out completely", async () => {
    render(<TimerAutomationForm handleSubmit={handleSubmit} />);

    const submitButton = screen.getByTestId("submit-button");

    expect(submitButton).toBeDisabled();
  });

  it("renders empty form fields when the automation prop is not provided", async () => {
    await act(async () => {
      render(
        <Router>
          <TimerAutomationForm handleSubmit={handleSubmit} />
        </Router>
      );
    });

    const nameInput = screen.getByTestId("name-input");
    const timeInput = screen.getByTestId("time-input");
    const devicesInput = screen.getByTestId("devices-input");
    const daysInput = screen.getByTestId("days-input");

    expect(nameInput.value).toBe("");
    expect(timeInput.value).toBe("");
    expect(devicesInput.value).toBe("");

    const checkboxes = within(daysInput).getAllByRole("checkbox");
    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it("populates form fields correctly when the automation prop is provided", async () => {
    await act(async () => {
      render(
        <Router>
          <TimerAutomationForm
            handleSubmit={handleSubmit}
            automation={mockAutomation}
          />
        </Router>
      );
    });

    const nameInput = screen.getByTestId("name-input");
    const timeInput = screen.getByTestId("time-input");
    const daysInput = screen.getByTestId("days-input");

    expect(nameInput.value).toBe(mockAutomation.name);
    expect(timeInput.value).toBe(mockAutomation.time);

    const checkboxes = within(daysInput).getAllByRole("checkbox");
    checkboxes.forEach((checkbox, index) => {
      const day = Object.keys(mockAutomation.weekdays)[index];
      expect(checkbox.checked).toBe(mockAutomation.weekdays[day]);
    });
    expect(screen.getByText("No devices available")).toBeInTheDocument();
  });
});
