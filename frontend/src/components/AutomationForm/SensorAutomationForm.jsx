import { useState } from "react";
import DeviceSelection from "./DeviceSelection";
import { dummySensors } from "../../dummyData/dummySensor";

const SensorAutomationForm = () => {
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [value, setValue] = useState(0);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [action, setAction] = useState(""); // 'Turn on' or 'Turn off'

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { selectedSensor, value, selectedDevices, action };
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Sensor:
        <select
          value={selectedSensor}
          onChange={(e) => setSelectedSensor(e.target.value)}
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
        devices={dummySensors}
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

      <button type="submit">Create Automation</button>
    </form>
  );
};

export default SensorAutomationForm;
