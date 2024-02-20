import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DeviceSelection from "./DeviceSelection";

import { dummySensors } from "../../dummyData/dummySensors";
import { dummyDevices } from "../../dummyData/dummyDevices";
import { dummyAutomations } from "../../dummyData/dummyAutomations";

const SensorAutomationForm = ({ handleSubmit }) => {
  const { id } = useParams();

  const [automation, setAutomation] = useState(null);
  const [isLoading, setIsLoading] = useState(!!id);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const fetchAutomation = async () => {
      const foundAutomation = dummyAutomations.find(
        (automation) => automation.id == id
      );
      setAutomation(foundAutomation);
      setIsLoading(false);
    };
    if (id) {
      fetchAutomation();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const [selectedSensorId, setSelectedSensorId] = useState("");
  const [value, setValue] = useState(0);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [action, setAction] = useState("");

  useEffect(() => {
    if (automation) {
      setSelectedSensorId(automation.sensor.id);
      setValue(automation.sensorValue);
      setSelectedDevices(automation.devices);
      setAction(automation.actionType === "Turn on" ? "Turn on" : "Turn off");
      setIsDisabled(automation.isDisabled);
    }
  }, [automation]);

  const onSubmit = (event) => {
    event.preventDefault();
    const selectedSensor = dummySensors.find(
      (sensor) => sensor.id === selectedSensorId
    );
    const data = { selectedSensor, value, selectedDevices, action, isDisabled };
    handleSubmit(data, id);
  };

  const isButtonDisabled = () => {
    const noSensorSelected = !selectedSensorId;
    const noDevicesSelected = selectedDevices.length === 0;
    const noActionSelected = !action;
    return (
      isLoading || noSensorSelected || noDevicesSelected || noActionSelected
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Sensor:
        <select
          value={selectedSensorId}
          onChange={(e) => setSelectedSensorId(e.target.value)}
        >
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
        selectedDevices={selectedDevices}
        setSelectedDevices={setSelectedDevices}
      />

      <label>
        Action:
        <select value={action} onChange={(e) => setAction(e.target.value)}>
          <option value="">Select an action</option>
          <option value="Turn on">Turn on</option>
          <option value="Turn off">Turn off</option>
        </select>
      </label>

      <button type="submit" disabled={isButtonDisabled()}>
        {isLoading
          ? "Loading..."
          : automation
          ? "Update Automation"
          : "Create New Automation"}
      </button>
    </form>
  );
};

export default SensorAutomationForm;
