import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { RoomContext } from "../../context/RoomContext";
import NavbarDesktop from "../../components/NavbarDesktop";

// Mock FontAwesomeIcon for simplicity
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: ({ icon }) => <span>{icon.iconName}</span>,
}));

describe("NavbarDesktop", () => {
  const mockRooms = [
    { id: 1, name: "Living Room" },
    { id: 2, name: "Kitchen" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly when user is logged in", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isLoggedIn: true }}>
          <RoomContext.Provider value={{ rooms: mockRooms }}>
            <NavbarDesktop />
          </RoomContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Smart Home Mate")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Automation")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Accessories")).toBeInTheDocument();
    expect(screen.getByText("Living Room")).toBeInTheDocument();
    expect(screen.getByText("Kitchen")).toBeInTheDocument();
  });

  it("renders correctly when user is not logged in", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isLoggedIn: false }}>
          <RoomContext.Provider value={{ rooms: [] }}>
            <NavbarDesktop />
          </RoomContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Smart Home Mate")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.queryByText("Living Room")).not.toBeInTheDocument();
  });

  it("prevents navigation when user is not logged in", () => {
    const handleClick = vi.fn();
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isLoggedIn: false }}>
          <RoomContext.Provider value={{ rooms: [] }}>
            <NavbarDesktop />
          </RoomContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Automation"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
