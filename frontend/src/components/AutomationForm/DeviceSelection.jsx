import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./CreateAutomation.module.css";
import { useTranslation } from "react-i18next";

const DeviceSelection = ({ devices, selectedDevices, setSelectedDevices }) => {
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const { t } = useTranslation();

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
          {selectedDevices.map((device, index) => (
            <li key={index} className={styles.centerContent}>
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
        <p>No devices selected</p>
      )}
    </div>
  );
};

export default DeviceSelection;
