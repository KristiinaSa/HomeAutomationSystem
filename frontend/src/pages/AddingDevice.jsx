import { useState, useEffect } from "react";
import { getRooms } from "../services/roomServices";
import { addDevice } from "../services/accessoryServices";
import "./AddingDevice.css";

const AddingDevice = () => {
  const [device, setDevice] = useState({ name: '', type: 'light' });
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState({});

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await getRooms();
        setRooms(rooms);
        console.log("Rooms from database:", rooms);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRooms();
  }, []);

  const newDevice = async (event) => {
    event.preventDefault();
    try {
      await addDevice(device, room);
    } catch (error) {
      console.log("Error adding device", error.message);
    }
  };

  return (
    <div className="add-device-container">
      <h1>Adding a device</h1>
      <div>
        <label htmlFor="roomName">Choose a room:</label>
        <select
          value={device.room_id} // To ensure the select shows the current state
          onChange={(e) => setRoom(e.target.value)}
        >
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="deviceType">Choose a device category:</label>
        <select
          value={device.type} // To ensure the select shows the current state
          onChange={(e) => setDevice({ ...device, type: e.target.value })}
        >
          <option value="light">Light</option>
        </select>
      </div>
      <form onSubmit={newDevice}>
        <label htmlFor="deviceName">Device Name:</label>
        <input
          type="text"
          id="deviceName"
          name="deviceName"
          value={device.name} // To ensure the input shows the current state
          onChange={(e) => setDevice({ ...device, name: e.target.value })}
        />
        <button type="submit">Add Device</button>
        <button type="reset">Cancel</button>
      </form>
    </div>
  );
};

export default AddingDevice;
