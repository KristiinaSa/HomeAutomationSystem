import { addRoom } from "../services/roomServices";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import { useTranslation } from "react-i18next";
import "./AddingRoom.css";

const AddingRoom = () => {
  const [newRoom, setNewRoom] = useState({ name: "", system_id: 1 });
  const [message, setMessage] = useState("");
  const { setUpdate, errorMessage } = useContext(RoomContext);
  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState(null);
  const { t } = useTranslation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("New room:", newRoom);
    const result = await addRoom(newRoom);
    if (result) {
      setUpdate(true);
      setMessage(t("Great news! New room has been added successfully."));
      const id = setTimeout(() => {
        navigate(-1); // Navigate to the previous page after 2 seconds
      }, 2000);
      setTimeoutId(id);
    } else {
      setMessage(
        t(
          "Oops! We hit a bump adding your room. Let's try that one more time, shall we?"
        )
      );
      setTimeout(() => {
        setMessage("");
      }, 2000);
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
    <div className="new-room-container">
      <h1>{t("add") + " " + t("room")}</h1>
      <form onSubmit={handleSubmit} className="choose-section">
        <label htmlFor="roomName">{t("room name") + ":"}</label>
        <input
          type="text"
          id="roomName"
          onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
          className="choose-box"
        />
        <div className="btn-container">
          <button type="submit" className="primary-btn add-btn">
            {t("add") + " " + t("room")}
          </button>
          <button
            type="reset"
            className="secondary-btn cancel-btn"
            onClick={handleCancel}
          >
            {t("cancel")}
          </button>
        </div>
      </form>
      {(message || errorMessage) && <p>{message || errorMessage}</p>}
    </div>
  );
};

export default AddingRoom;
