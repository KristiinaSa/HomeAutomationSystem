import { useState, useContext, useEffect } from "react";
// import { getRooms } from "../services/roomServices";
import { addDevice } from "../services/accessoryServices";
import "./AddingDevice.css";
import { useNavigate } from "react-router-dom";
import { DeviceContext } from "../context/DeviceContext";
import { RoomContext } from "../context/RoomContext";

const AddingDevice = () => {
  const [device, setDevice] = useState({ name: "", type: "light" });
  const { rooms } = useContext(RoomContext);
  const [chosenRoom, setChosenRoom] = useState(1);
  const [message, setMessage] = useState("");
  const { setUpdate } = useContext(DeviceContext);
  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const deviceInfo = {
      name: device.name,
      type: device.type,
      room_id: chosenRoom,
    };
    const result = await addDevice(deviceInfo);
    if (result) {
      setUpdate(true);
      setMessage("Device added successfully");
      const id = setTimeout(() => {
        navigate(-1); // Navigate to the previous page after 2 seconds
      }, 2000);
      setTimeoutId(id);
    } else {
      setMessage("Failed to add device");
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="add-device-container">
      <h1>Adding a device</h1>
      <div className="choose-section">
        <label htmlFor="roomName">Choose a room:</label>
        <select
          id="roomName"
          value={chosenRoom} // To ensure the select shows the current state
          onChange={(e) => {
            setChosenRoom(Number(e.target.value));
          }}
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
          id="deviceType"
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
          <button type="submit" className="primary-btn add-btn">
            Add Device
          </button>
          <button
            type="reset"
            className="secondary-btn cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddingDevice;
