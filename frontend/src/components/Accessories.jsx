import { deleteDevice } from "../services/accessoryServices";
import { useContext, useState } from "react";
import "./Accessories.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { DeviceContext } from "../context/DeviceContext";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const Accessories = () => {
  const { devices, setUpdate, errorMsg } = useContext(DeviceContext);
  const { role } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();

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

  const deletionDevice = async (id) => {
    if (!window.confirm(t("Are you sure you want to delete this device?"))) return;
    else {
      try {
        console.log("Deleting device with id:", id);
        await deleteDevice(id);
        setUpdate(true);
        setMessage(t("Done! Your device has been removed."));
      } catch (error) {
        console.log("Error delete device", error.message);
        setMessage(t("Could not delete device this time. Please try again later"));
      }
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  return (
    <div className="accessories-container">
      <div>
        <h1>{t("accessories")}</h1>
        <button
          type="button"
          className="primary-btn analytics-btn"
          onClick={() => handleClick("showAnalytics")}
        >
          {t("show analytics")}
        </button>
      </div>
      <div className="devices-container">
        <div className="title-button">
          <h2>{t("devices")}</h2>
          {(role === "admin" || role === "owner") && (
            <button
              type="button"
              className="primary-btn"
              onClick={() => handleClick("addDevice")}
            >
              {t("add")} {t("device")}
            </button>
          )}
        </div>
        <div className="device-container">
          {devices.map((device) => (
            <div key={device.id} className="device-card">
              <div>
                <p>{device.name}</p>
                <p className="secondary-text">{device.room.name}</p>
                <p className="secondary-text">{t(device.device_type.name)}</p>
              </div>
              {(role === "admin" || role === "owner") && (
                <FontAwesomeIcon
                  icon={faTrash}
                  className="delete"
                  data-testid={`delete-${device.id}`}
                  onClick={() => deletionDevice(device.id)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {(message || errorMsg) && <p>{message || errorMsg}</p>}
    </div>
  );
};

export default Accessories;
