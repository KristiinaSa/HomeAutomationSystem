import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import NavbarMobile from "../../components/NavbarMobile";
import { LanguageContext } from "../../context/LanguageContext";
import { languageContextValue } from "../../utils/languageTestSetup";

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
          <LanguageContext.Provider value={languageContextValue}>
            <NavbarMobile />
          </LanguageContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Automation")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Accessories")).toBeInTheDocument();
  });
});
