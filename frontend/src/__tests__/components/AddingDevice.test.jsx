import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { addDevice } from "../../services/accessoryServices";
import AddingDevice from "../../components/AddingDevice";
import { DeviceContext } from "../../context/DeviceContext";
import { RoomContext } from "../../context/RoomContext";
import { LanguageContext } from "../../context/LanguageContext";
import { AuthContext } from "../../context/AuthContext";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n-test";
import { languageContextValue } from "../../utils/languageTestSetup";

const authContextValue = {
  role: "admin",
  isLoggedIn: true,
};

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
      <I18nextProvider i18n={i18n}>
        <LanguageContext.Provider value={languageContextValue}>
          <AuthContext.Provider value={authContextValue}>
            <RoomContext.Provider value={{ rooms: mockRooms }}>
              <DeviceContext.Provider value={{ setUpdate }}>
                <AddingDevice />
              </DeviceContext.Provider>
            </RoomContext.Provider>
          </AuthContext.Provider>
        </LanguageContext.Provider>
      </I18nextProvider>
    );

    expect(screen.getByTestId("add-title")).toHaveTextContent("Add Device");
    expect(screen.getByText("Choose a room:")).toBeInTheDocument();
    expect(screen.getByText("Choose a device category:")).toBeInTheDocument();
    expect(screen.getByText("Device name:")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toHaveTextContent("Add Device");
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("fills the form and submits", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageContext.Provider value={languageContextValue}>
          <AuthContext.Provider value={authContextValue}>
            <RoomContext.Provider value={{ rooms: mockRooms }}>
              <DeviceContext.Provider value={{ setUpdate }}>
                <AddingDevice />
              </DeviceContext.Provider>
            </RoomContext.Provider>
          </AuthContext.Provider>
        </LanguageContext.Provider>
      </I18nextProvider>
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
    
    fireEvent.click(screen.getByTestId("add-button"));

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
      <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider value={languageContextValue}>
        <AuthContext.Provider value={authContextValue}>
          <RoomContext.Provider value={{ rooms: mockRooms }}>
            <DeviceContext.Provider value={{ setUpdate }}>
              <AddingDevice />
            </DeviceContext.Provider>
          </RoomContext.Provider>
        </AuthContext.Provider>
      </LanguageContext.Provider>
    </I18nextProvider>
    );

    fireEvent.click(screen.getByText("Cancel"));

    expect(navigate).toHaveBeenCalledWith(-1);
  });

  it("renders the correct text in japanese", async () => {
    const { rerender } = render(
      <I18nextProvider i18n={i18n}>
        <LanguageContext.Provider value={languageContextValue}>
          <AuthContext.Provider value={authContextValue}>
            <RoomContext.Provider value={{ rooms: mockRooms }}>
              <DeviceContext.Provider value={{ setUpdate }}>
                <AddingDevice />
              </DeviceContext.Provider>
            </RoomContext.Provider>
          </AuthContext.Provider>
        </LanguageContext.Provider>
      </I18nextProvider>
    );

    await i18n.changeLanguage("jp");

    rerender(
      <I18nextProvider i18n={i18n}>
        <LanguageContext.Provider value={languageContextValue}>
          <AuthContext.Provider value={authContextValue}>
            <RoomContext.Provider value={{ rooms: mockRooms }}>
              <DeviceContext.Provider value={{ setUpdate }}>
                <AddingDevice />
              </DeviceContext.Provider>
            </RoomContext.Provider>
          </AuthContext.Provider>
        </LanguageContext.Provider>
      </I18nextProvider>
    );

    const addElements = await screen.getAllByText("追加 デバイス");
    addElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  
  });
});
