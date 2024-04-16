import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { addDevice } from "../../services/accessoryServices";
import AddingDevice from "../../components/AddingDevice";
import { DeviceContext } from "../../context/DeviceContext";
import { RoomContext } from "../../context/RoomContext";
import { LanguageContext } from "../../context/LanguageContext";
import { languageContextValue } from "../../utils/languageTestSetup";


const navigate = vi.fn();

const mockRooms = [{ id: 1, name: "Room 1" }];
const setUpdate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // Import actual implementations
  return {
    ...actual, // Spread actual implementations
    useNavigate: () => navigate, // Mock useNavigate with a spy function
  };
});

vi.mock("../../services/accessoryServices", () => ({
  addDevice: vi.fn(),
}));

describe("AddingDevice", () => {
  beforeEach(() => {
    navigate.mockClear();
    addDevice.mockResolvedValue(true);
  });

  it("renders correctly", async () => {
    render(
      <RoomContext.Provider value={{ rooms: mockRooms }}>
        <DeviceContext.Provider value={{ setUpdate }}>
          <LanguageContext.Provider value={languageContextValue}>
            <AddingDevice />
          </LanguageContext.Provider>
        </DeviceContext.Provider>
      </RoomContext.Provider>
    );

    expect(
      screen.getByRole("heading", { name: /Add Device/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Device/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Choose a device category:")).toBeInTheDocument();
    expect(screen.getByText("Device name:")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("fills the form and submits", async () => {
    render(
      <RoomContext.Provider value={{ rooms: mockRooms }}>
        <DeviceContext.Provider value={{ setUpdate }}>
          <LanguageContext.Provider value={languageContextValue}>
            <AddingDevice />
          </LanguageContext.Provider>
        </DeviceContext.Provider>
      </RoomContext.Provider>
    );

    fireEvent.change(screen.getByLabelText("Choose a room:"), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText("Choose a device category:"), {
      target: { value: "light" },
    });
    fireEvent.change(screen.getByLabelText("Device name:"), {
      target: { value: "Light 1" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add Device/i }));

    await waitFor(() =>
      expect(addDevice).toHaveBeenCalledWith({
        name: "Light 1",
        room_id: 1,
        type: "light",
      })
    );

    expect(
      screen.getByText("Great news! Your device has been added successfully.")
    ).toBeInTheDocument();

    await new Promise((r) => setTimeout(r, 2000));
    await waitFor(() => expect(navigate).toHaveBeenCalledWith(-1));
  });

  it("cancels the form", async () => {
    render(
      <RoomContext.Provider value={{ rooms: mockRooms }}>
        <DeviceContext.Provider value={{ setUpdate }}>
          <LanguageContext.Provider value={languageContextValue}>
            <AddingDevice />
          </LanguageContext.Provider>
        </DeviceContext.Provider>
      </RoomContext.Provider>
    );

    fireEvent.click(screen.getByText("Cancel"));

    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
