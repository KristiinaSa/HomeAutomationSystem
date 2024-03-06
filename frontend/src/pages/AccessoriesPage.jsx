import { getDevices, deleteDevice } from "../services/accessoryServices";
import { useState, useEffect } from "react";
import "./AccessoriesPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const AccessoriesPage = () => {
  const [devices, setDevices] = useState([]);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();

  const handleClick = (eventType) => {
    switch (eventType) {
      case "addDevice":
        navigate("/add-device");
        break;
      case "showAnalytics":
        navigate("/analytics");
        break;
    }
  };

  const fetchDevices = async () => {
    try {
      const devices = await getDevices();
      setDevices(devices);
      setUpdate(false);
      console.log("Devices from database:", devices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [update]);

  const deletionDevice = async (id) => {
    if (!window.confirm("Are you sure you want to delete this device?")) return;
    else {
      try {
        console.log("Deleting device with id:", id);
        await deleteDevice(id);
        setUpdate(true);
      } catch (error) {
        console.log("Error delete device", error.message);
      }
    }
  };

  return (
    <div className="accessories-container">
        <div>
      <h1>Accessories</h1>
      <button
        type="button"
        className="primary-btn analytics-btn"
        onClick={() => handleClick("showAnalytics")}
      >
        Show analytics
      </button>
    </div>
      <div className="devices-container">
        <div className="title-button">
          <h4>Devices</h4>
          <button
            type="button"
            className="primary-btn"
            onClick={() => handleClick("addDevice")}
          >
            Add device
          </button>
        </div>
        <div className="device-container">
          {devices.map((device) => (
            <div key={device.id} className="device-card">
                <div>
              <p>{device.name}</p>
              <p className="secondary-text">{device.type}</p>
              </div>
              <FontAwesomeIcon
                icon={faTrash}
                className="delete"
                data-testid={`delete-${device.id}`}
                onClick={() => deletionDevice(device.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessoriesPage;
