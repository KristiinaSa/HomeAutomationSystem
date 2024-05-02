import { useEffect, useState } from "react";

import DeviceSelection from "./DeviceSelection";
import { DisableCheckbox } from "./DisableCheckbox";

import { dummySensors } from "../../dummyData/dummySensors";
import { getDevices } from "../../services/accessoryServices";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import styles from "./CreateAutomation.module.css";

const SensorAutomationForm = ({ handleSubmit, automation, handleDelete }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [name, setName] = useState("");
  const [sensorId, setSensorId] = useState("");
  const [value, setValue] = useState(0);
  const [devices, setDevices] = useState([]);
  const [action, setAction] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (automation) {
      setName(automation.name);
      setSensorId(automation.sensor.id);
      setValue(automation.value);
      setDevices(automation.devices || []);
      setAction(automation.type === "Turn on" ? "Turn on" : "Turn off");
      setIsDisabled(automation.isDisabled);
    }
  }, [automation]);

  useEffect(() => {
    const fetchDevices = async () => {
      const devices = await getDevices();
      setDevices(devices);
    };
    fetchDevices();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const sensor = dummySensors.find((sensor) => sensor.id == sensorId);

    const data = {
      name,
      sensor,
      value,
      devices,
      action,
      isDisabled,
      type: automation ? automation.type : "sensor",
    };
    console.log(data);
    handleSubmit(data, automation?.id);
  };

  const isButtonDisabled = () => {
    const noSensorSelected = !sensorId;
    const noDevicesSelected = devices.length === 0;
    const noActionSelected = !action;
    return noSensorSelected || noDevicesSelected || noActionSelected || !name;
  };

  return (
    <form onSubmit={onSubmit} className={styles.verticalLayout}>
      <label className={styles.sensorLabel}>
        Name:{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />{" "}
      </label>

      <label className={styles.sensorLabel}>
        Sensor: <select value={sensorId} onChange={(e) => setSensorId(e.target.value)}>
          <option value="">Select a sensor</option>
          {dummySensors.map((sensor) => (
            <option key={sensor.id} value={sensor.id}>
              {sensor.name}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.sensorLabel}>
        Value: <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value}
      </label>

      <DeviceSelection
        devices={devices}
        selectedDevices={devices}
        setSelectedDevices={setDevices}
      />

      <label className={styles.sensorLabel}>
        Action: <select value={action} onChange={(e) => setAction(e.target.value)}>
          <option value="">Select an action</option>
          <option value="Turn on">Turn on</option>
          <option value="Turn off">Turn off</option>
        </select>
      </label>

      <DisableCheckbox
        automation={automation}
        isDisabled={isDisabled}
        handleCheckboxChange={(event) => setIsDisabled(event.target.checked)}
      />
      <div className={styles.buttonsArea}>
        <button
          type="submit"
          disabled={isButtonDisabled()}
          className={isButtonDisabled() ? styles.disabledButton : "primary-btn"}
        >
          {automation ? "Update Automation" : "Create New Automation"}
        </button>

        {automation && (
          <button
            onClick={() => handleDelete(automation.id)}
            className={styles.deleteButton}
            aria-label="Delete"
          >
            <FontAwesomeIcon icon={"fa-solid fa-trash"} />
          </button>
        )}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="secondary-btn"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SensorAutomationForm;
