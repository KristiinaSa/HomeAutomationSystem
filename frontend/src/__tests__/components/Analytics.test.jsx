import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen, prettyDOM } from "@testing-library/react";
import Analytics from "../../components/Analytics";
import * as accessoryServices from "../../services/accessoryServices";
import { LanguageContext } from "../../context/LanguageContext";
import { languageContextValue } from "../../utils/languageTestSetup";

vi.mock("../../services/accessoryServices", () => ({
  getAllAnalytics: vi.fn(),
}));

describe("Analytics", () => {
  beforeEach(() => {
    accessoryServices.getAllAnalytics.mockResolvedValue([
      {
        id: 1,
        name: "Device 1",
        room_name: "Room 1",
        active_time: 61,
        last_interaction: { date: "2024-04-16T09:13:00.000Z", user: "Jonne" },
      },
      {
        id: 2,
        name: "Device 2",
        room_name: "Room 2",
        active_time: 121,
        last_interaction: { date: "2024-04-16T10:00:00.000Z", user: "Jonne" },
      },
    ]);
  });

  it("fetches and displays analytics correctly", async () => {
    const { container } = render(
      <LanguageContext.Provider value={languageContextValue}>
        <Analytics />
      </LanguageContext.Provider>
    );

    console.log(prettyDOM(container));

    expect(await screen.findByText("Device 1")).toBeInTheDocument();
    expect(screen.getByText("Room 1")).toBeInTheDocument();
    
    const timeElements = screen.getAllByText("Active time today:")
    expect(timeElements).toHaveLength(2);
    
    expect(
      screen.getByText("1 hour 1 minute")
    )
    const lastInteractionElements = screen.getAllByText("Last interaction:")
    expect(lastInteractionElements).toHaveLength(2);
    expect(
      screen.getByText("Apr 16, 2024, 12:13 PM")
    ).toBeInTheDocument();
    const userElements = screen.getAllByText("User:")
    expect(userElements).toHaveLength(2);

    expect(screen.getByText("Device 2")).toBeInTheDocument();
    expect(screen.getByText("Room 2")).toBeInTheDocument();
    
    expect(
      screen.getByText("2 hours 1 minute")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Apr 16, 2024, 12:13 PM")
    ).toBeInTheDocument();
  });

  it("displays error message when fetching analytics fails", async () => {
    accessoryServices.getAllAnalytics.mockRejectedValue(
      "Error fetching analytics"
    );

    render(
      <LanguageContext.Provider value={languageContextValue}>
        <Analytics />
      </LanguageContext.Provider>
    );

    expect(
      await screen.findByText(
        "Uh-oh! We ran into a snag pulling up your analytics. Could you try again later?"
      )
    ).toBeInTheDocument();
  });
});
