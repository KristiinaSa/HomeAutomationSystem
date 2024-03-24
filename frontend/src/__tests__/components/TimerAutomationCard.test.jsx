import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { test, expect } from "vitest";
import { TimerAutomationCard } from "../../components/Automations/TimerAutomationCard.jsx";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n.js";

test("TimerAutomationCard renders correctly", () => {
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
  render(
    <Router>
      <I18nextProvider i18n={i18n}>
        <TimerAutomationCard automation={mockAutomation} />
      </I18nextProvider>
    </Router>
  );

  const cardElement = screen.getByTestId("automation-card");
  expect(cardElement).toBeInTheDocument();

  const nameElement = screen.getByTestId("automation-name");
  expect(nameElement.textContent).toBe("Test Automation 2");

  const statusElement = screen.getByTestId("automation-status");
  expect(statusElement.textContent).toBe("Disabled");

  const timeElement = screen.getByTestId("automation-time");
  expect(timeElement.textContent).toBe("22:00");

  const activeDaysElement = screen.getByTestId("automation-active-days");
  expect(activeDaysElement.textContent).toBe("Everyday");
});
