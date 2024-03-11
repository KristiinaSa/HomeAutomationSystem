import { addRoom } from "../services/roomServices";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import "./AddingRoom.css";

const AddingRoom = () => {
  const [newRoom, setNewRoom] = useState({ name: '', system_id: 1 });
  const [message, setMessage] = useState('');
  const { setUpdate } = useContext(RoomContext);
    const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("New room:", newRoom);
    const result = await addRoom(newRoom);
    if (result) {
        setUpdate(true);
        setMessage('Room added successfully');
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
    <div className="new-room-container">
      <h1>Adding a room</h1>
      <form onSubmit={handleSubmit} className="choose-section">
        <label htmlFor="roomName">Room name:</label>
        <input
          type="text"
          id="roomName"
          onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
          className="choose-box"
        />
        <div className="btn-container">
          <button type="submit" className="primary-btn add-btn">
            Add Room
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

export default AddingRoom;
