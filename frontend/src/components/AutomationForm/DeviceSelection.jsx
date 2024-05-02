import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./CreateAutomation.module.css";
import { useLanguage } from "../../context/LanguageContext";

const DeviceSelection = ({ devices, selectedDevices, setSelectedDevices }) => {
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const { t } = useLanguage();

  const handleDeviceChange = (event) => {
    const selectedDevice = devices.find(
      (device) => device.id === Number(event.target.value)
    );
    setSelectedDevices([...selectedDevices, selectedDevice]);
    setSelectedDeviceId("");
  };

  const handleRemoveDevice = (deviceToRemove) => {
    setSelectedDevices(
      selectedDevices.filter((device) => device.id !== deviceToRemove.id)
    );
    if (deviceToRemove.id === Number(selectedDeviceId)) {
      setSelectedDeviceId("");
    }
  };

  const availableDevices = devices.filter(
    (device) => !selectedDevices.some((selected) => selected.id === device.id)
  );

  return (
    <div className={styles.deviceSelection} data-testid="devices-input">
      <p>{t("devices")}</p>
      {availableDevices.length > 0 ? (
        <select
          value={selectedDeviceId}
          onChange={handleDeviceChange}
          className={styles.selectBox}
        >
          <option value="" disabled>
            {t("select devices")}
          </option>
          {availableDevices.map((device) => (
            <option key={device.id} value={device.id}>
              {`${device.name} (${device.room.name})`}
            </option>
          ))}
        </select>
      ) : (
        <p>{t("no devices available")}</p>
      )}
      {selectedDevices.length > 0 ? (
        <ul className={styles.deviceList}>
          {selectedDevices.map((device) => (
            <li key={device.id} className={styles.centerContent}>
              {`${device.name} (${device.room.name})`}
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => handleRemoveDevice(device)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>{t("no devices selected")}</p>
      )}
    </div>
  );
};

DeviceSelection.propTypes = {
  devices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      room: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  selectedDevices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      room: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  setSelectedDevices: PropTypes.func.isRequired,
};

export default DeviceSelection;
