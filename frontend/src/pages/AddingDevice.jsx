import { useState, useEffect } from "react";
import { getRooms } from "../services/roomServices";
import { addDevice } from "../services/accessoryServices";
import "./AddingDevice.css";
import { useNavigate } from "react-router-dom";

const AddingDevice = () => {
  const [device, setDevice] = useState({ name: '', type: 'light' });
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await addDevice(device, room);
  
    if (result) {
      setMessage('Device added successfully');
      setTimeout(() => {
        navigate(-1); // Navigate to the previous page after 2 seconds
      }, 2000);
    } else {
      setMessage('Failed to add device');
    }
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  return (
    <div className="add-device-container">
      <h1>Adding a device</h1>
      <div className="choose-section">
        <label htmlFor="roomName">Choose a room:</label>
        <select
          value={device.room_id} // To ensure the select shows the current state
          onChange={(e) => setRoom(e.target.value)}
          className="choose-box"
        >
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
      </div>
      <div className="choose-section">
        <label htmlFor="deviceType">Choose a device category:</label>
        <select
          value={device.type} // To ensure the select shows the current state
          onChange={(e) => setDevice({ ...device, type: e.target.value })}
          className="choose-box"
        >
          <option value="light">Light</option>
        </select>
      </div>
      <form onSubmit={handleSubmit} className="choose-section">
        <label htmlFor="deviceName">Device Name:</label>
        <input
          type="text"
          id="deviceName"
          name="deviceName"
          value={device.name} // To ensure the input shows the current state
          onChange={(e) => setDevice({ ...device, name: e.target.value })}
          className="choose-box"
        />
        <div className="btn-container">
        <button type="submit" className="primary-btn add-device-btn">Add Device</button>
        <button type="reset" className="secondary-btn cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddingDevice;
