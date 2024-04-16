import { vi, expect, describe, it, beforeEach } from "vitest";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { addRoom } from "../../services/roomServices";
import AddingRoom from "../../components/AddingRoom";
import { RoomContext } from "../../context/RoomContext";
import { LanguageContext } from "../../context/LanguageContext";
import { languageContextValue } from "../../utils/languageTestSetup";

const navigate = vi.fn();
const setUpdate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // Import actual implementations
  return {
    ...actual, // Spread actual implementations
    useNavigate: () => navigate, // Mock useNavigate with a spy function
  };
});

vi.mock("../../services/roomServices", () => ({
  addRoom: vi.fn(),
}));

describe("AddingRoom", () => {
  beforeEach(() => {
    navigate.mockClear();
    addRoom.mockResolvedValue(true);
  });
  it("renders correctly", () => {
    render(
      <RoomContext.Provider value={{ setUpdate }}>
        <LanguageContext.Provider value={languageContextValue}>
          <AddingRoom />
        </LanguageContext.Provider>
      </RoomContext.Provider>
    );
    expect(
      screen.getByRole("heading", { name: /Add Room/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Room/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Room name:")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("handles form submission", async () => {
    render(
      <RoomContext.Provider value={{ setUpdate }}>
        <LanguageContext.Provider value={languageContextValue}>
          <AddingRoom />
        </LanguageContext.Provider>
      </RoomContext.Provider>
    );
    fireEvent.change(screen.getByLabelText("Room name:"), {
      target: { value: "New Room" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add Room/i }));

    await waitFor(() =>
      expect(addRoom).toHaveBeenCalledWith({ name: "New Room", system_id: 1 })
    );
    expect(
      screen.getByText("Great news! New room has been added successfully.")
    ).toBeInTheDocument();

    await new Promise((r) => setTimeout(r, 2000));
    await waitFor(() => expect(navigate).toHaveBeenCalledWith(-1));
  });

  it("handles form cancellation", () => {
    render(
      <RoomContext.Provider value={{ setUpdate }}>
        <LanguageContext.Provider value={languageContextValue}>
          <AddingRoom />
        </LanguageContext.Provider>
      </RoomContext.Provider>
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
