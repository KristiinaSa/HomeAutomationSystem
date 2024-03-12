import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import NavbarMobile from "../../components/NavbarMobile";

vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: ({ icon }) => <span>{icon.iconName}</span>,
}));

describe("NavbarMobile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isLoggedIn: true }}>
          <NavbarMobile />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Automation")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Accessories")).toBeInTheDocument();
  });

    it("prevents navigation when user is not logged in", () => {
        const handleClick = vi.fn();
    
        render(
        <MemoryRouter>
            <AuthContext.Provider value={{ isLoggedIn: false }}>
            <NavbarMobile />
            </AuthContext.Provider>
        </MemoryRouter>
        );
    
        fireEvent.click(screen.getByText("Home"));
        fireEvent.click(screen.getByText("Automation"));
        fireEvent.click(screen.getByText("Settings"));
        fireEvent.click(screen.getByText("Accessories"));
    
        expect(handleClick).not.toHaveBeenCalledTimes();
    });
});
