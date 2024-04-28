import "./AddingDevice.css";

import { useState, useContext, useEffect } from "react";
import { addDevice } from "../services/accessoryServices";
import { useNavigate } from "react-router-dom";
import { DeviceContext } from "../context/DeviceContext";
import { RoomContext } from "../context/RoomContext";
import { CategoriesContext } from "../context/CategoriesContext";
import { useLanguage } from "../context/LanguageContext";

const AddingDevice = () => {
  const [device, setDevice] = useState({ name: "", type: "" });
  const { categories } = useContext(CategoriesContext);
  const { rooms, errorMessage } = useContext(RoomContext);
  const [chosenRoom, setChosenRoom] = useState("");
  const [message, setMessage] = useState("");
  const { setUpdate } = useContext(DeviceContext);
  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState(null);
  const { t } = useLanguage();
  const isNameBlank = device.name.trim() === '';

  useEffect(() => {
    if (categories.length > 0) {
      setDevice((prevDevice) => ({
        ...prevDevice,
        type: categories[0].title,
      }));
    }
    if (rooms.length > 0) {
      setChosenRoom(rooms[0].id);
    }
  }, [rooms, chosenRoom, categories]);

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
      setMessage(t("Great news! Your device has been added successfully."));
      const id = setTimeout(() => {
        navigate(-1); // Navigate to the previous page after 2 seconds
      }, 2000);
      setTimeoutId(id);
    } else {
      setMessage(
        t(
          "Looks like adding your device didn't go through. Let's give it another go, shall we?"
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
    <div className="add-device-container">
      <h1 data-testid="add-title">{t("add") + " " + t("device")}</h1>
      <div className="choose-section">
        <label htmlFor="roomName">{t("choose a room") + ":"}</label>
        <select
          id="roomName"
          value={chosenRoom}
          onChange={(e) => {
            setChosenRoom(Number(e.target.value));
          }}
          className="choose-box"
          disabled={rooms.length === 0}
        >
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))
          ) : (
            <option>{t("No rooms available")}</option>
          )}
        </select>
      </div>
      <div className="choose-section">
        <label htmlFor="deviceType">
          {t("choose a device category") + ":"}
        </label>
        <select
          id="deviceType"
          value={device.type}
          onChange={(e) => setDevice({ ...device, type: e.target.value })}
          className="choose-box"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.title}>
              {t(category.title)}
            </option>
          ))}
        </select>
      </div>
      <form onSubmit={handleSubmit} className="choose-section">
        <label htmlFor="deviceName">{t("device name") + ":"}</label>
        <input
          type="text"
          id="deviceName"
          name="deviceName"
          value={device.name} // To ensure the input shows the current state
          onChange={(e) => setDevice({ ...device, name: e.target.value })}
          className="choose-box"
        />
        <div className="btn-container">
          <button
            type="submit"
            className={isNameBlank ? "disabled add-btn" : "primary-btn add-btn"}
            data-testid="add-button"
            disabled={isNameBlank}
          >
            {t("add") + " " + t("device")}
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

export default AddingDevice;
