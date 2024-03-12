import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { addDevice } from '../../services/accessoryServices';
import AddingDevice from '../../components/AddingDevice';
import { DeviceContext } from "../../context/DeviceContext";
import { RoomContext } from '../../context/RoomContext';

const navigate = vi.fn();

const mockRooms = [
    { id: 1, name: 'Room 1' },
];  
const setUpdate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // Import actual implementations
  return {
    ...actual, // Spread actual implementations
    useNavigate: () => navigate, // Mock useNavigate with a spy function
  };
});

vi.mock('../../services/accessoryServices', () => ({
    addDevice: vi.fn(),
}));

describe('AddingDevice', () => {
  beforeEach(() => {
    navigate.mockClear();
    addDevice.mockResolvedValue(true);
  });

  it('renders correctly', async () => {

        render(
          <RoomContext.Provider value={{ rooms: mockRooms }}>
            <DeviceContext.Provider value={{ setUpdate }}>
          <AddingDevice />
          </DeviceContext.Provider>
          </RoomContext.Provider>);

    expect(screen.getByText('Adding a device')).toBeInTheDocument();
    expect(screen.getByText('Choose a room:')).toBeInTheDocument();
    expect(screen.getByText('Choose a device category:')).toBeInTheDocument();
    expect(screen.getByText('Device Name:')).toBeInTheDocument();
    expect(screen.getByText('Add Device')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('fills the form and submits', async () => {

        render(
          <RoomContext.Provider value={{ rooms: mockRooms}}>
          <DeviceContext.Provider value={{ setUpdate }}>
          <AddingDevice />
          </DeviceContext.Provider>
          </RoomContext.Provider>);

    fireEvent.change(screen.getByLabelText('Choose a room:'), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText('Choose a device category:'), { target: { value: 'light' }});
    fireEvent.change(screen.getByLabelText('Device Name:'), { target: { value: 'Light 1' } });
    fireEvent.click(screen.getByText('Add Device'));

    await waitFor(() => expect(addDevice).toHaveBeenCalledWith({ name: 'Light 1', room_id: 1, type: 'light' }));
    
    expect(screen.getByText("Great news! Your device has been added successfully.")).toBeInTheDocument();
    
    await new Promise((r) => setTimeout(r, 2000));
    await waitFor(() => expect(navigate).toHaveBeenCalledWith(-1));
    });

    it('cancels the form', async () => {

            render(
              <RoomContext.Provider value={{ rooms: mockRooms }}>
              <DeviceContext.Provider value={{ setUpdate }}>
              <AddingDevice />
              </DeviceContext.Provider>
              </RoomContext.Provider>);
    
        fireEvent.click(screen.getByText('Cancel'));
    
        expect(navigate).toHaveBeenCalledWith(-1);
    });
});
