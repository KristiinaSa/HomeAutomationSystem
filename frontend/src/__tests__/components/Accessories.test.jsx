import { describe, it, vi, beforeEach, expect } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Accessories from "../../components/Accessories";
import * as accessoryServices from "../../services/accessoryServices";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { DeviceContext } from "../../context/DeviceContext";

vi.mock("../../services/accessoryServices", () => ({

  deleteDevice: vi.fn(),
}));

const navigate = vi.fn();

const mockDevices = [
  { id: 1, name: "Device 1", type: "Type A" },
  { id: 2, name: "Device 2", type: "Type B" },
];

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // Import actual implementations
  return {
    ...actual, // Spread actual implementations
    useNavigate: () => navigate, // Mock useNavigate with a spy function
  };
});

describe("Accessories", () => {
    beforeEach(() => {
        navigate.mockClear();
    });

  it("fetches and displays devices correctly", async () => {
    // accessoryServices.getDevices.mockResolvedValue([
    //   { id: 1, name: "Device 1", type: "Type A" },
    //   { id: 2, name: "Device 2", type: "Type B" },
    // ]);

    

    render(
    <DeviceContext.Provider value={{ devices: mockDevices }}>
    <Accessories />
    </DeviceContext.Provider>, { wrapper: MemoryRouter });

    expect(await screen.findByText("Device 1")).toBeInTheDocument();
    expect(screen.getByText("Type A")).toBeInTheDocument();
    expect(screen.getByText("Device 2")).toBeInTheDocument();
    expect(screen.getByText("Type B")).toBeInTheDocument();
  });

  it("navigates to add device page on button click", async () => {

    render(
      <DeviceContext.Provider value={{ devices: mockDevices }}>
      <Accessories />
      </DeviceContext.Provider>, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByRole("button", { name: "Add device" }));
    expect(navigate).toHaveBeenCalledWith("/add-device");
  });

  it("navigates to analytics page on button click", async () => {

    render(
      <DeviceContext.Provider value={{ devices: mockDevices }}>
      <Accessories />
      </DeviceContext.Provider>, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByText("Show analytics"));
    expect(navigate).toHaveBeenCalledWith("/analytics");
  });

  it("deletes a device on delete icon click", async () => {
    window.confirm = vi.fn().mockReturnValue(true);
    const setUpdate = vi.fn();
    accessoryServices.deleteDevice.mockResolvedValue({});

    const { findByTestId } = render(
      <DeviceContext.Provider value={{ devices: mockDevices, setUpdate }}>
      <Accessories />
      </DeviceContext.Provider>, { wrapper: MemoryRouter });

    await screen.findByText("Device 1"); 
    const deleteButton = await findByTestId("delete-1");

    expect(deleteButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(deleteButton);
    });

    expect(window.confirm).toHaveBeenCalledWith(
      "Are you sure you want to delete this device?"
    );
    await waitFor(() => {
      expect(accessoryServices.deleteDevice).toHaveBeenCalledWith(1);
      expect(setUpdate).toHaveBeenCalledWith(true);
    });
  });
});
