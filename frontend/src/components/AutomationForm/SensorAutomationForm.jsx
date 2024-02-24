import { useEffect, useState } from "react";

import DeviceSelection from "./DeviceSelection";
import { DisableCheckbox } from "./DisableCheckbox";

import { dummySensors } from "../../dummyData/dummySensors";
import { dummyDevices } from "../../dummyData/dummyDevices";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SensorAutomationForm = ({ handleSubmit, automation, handleDelete }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [name, setName] = useState("");
  const [sensorId, setSensorId] = useState("");
  const [value, setValue] = useState(0);
  const [devices, setDevices] = useState([]);
  const [action, setAction] = useState("");

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
    handleSubmit(data, automation?.id);
  };

  const isButtonDisabled = () => {
    const noSensorSelected = !sensorId;
    const noDevicesSelected = devices.length === 0;
    const noActionSelected = !action;
    return noSensorSelected || noDevicesSelected || noActionSelected || !name;
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />{" "}
      </label>

      <label>
        Sensor:
        <select value={sensorId} onChange={(e) => setSensorId(e.target.value)}>
          <option value="">Select a sensor</option>
          {dummySensors.map((sensor) => (
            <option key={sensor.id} value={sensor.id}>
              {sensor.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Value:
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value}
      </label>

      <DeviceSelection
        devices={dummyDevices}
        selectedDevices={devices}
        setSelectedDevices={setDevices}
      />

      <label>
        Action:
        <select value={action} onChange={(e) => setAction(e.target.value)}>
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

      <button type="submit" disabled={isButtonDisabled()}>
        {automation ? "Update Automation" : "Create New Automation"}
      </button>

      {automation && (
        <FontAwesomeIcon
          icon={"fa-solid fa-trash"}
          onClick={() => handleDelete(automation.id)}
          role="button"
          aria-label="Delete"
          style={{ cursor: "pointer" }}
        />
      )}
    </form>
  );
};

export default SensorAutomationForm;
