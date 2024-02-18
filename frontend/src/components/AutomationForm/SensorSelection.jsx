import { useState } from "react";

const SensorSelection = ({ sensors, selectedSensors, setSelectedSensors }) => {
  const [selectedSensorId, setSelectedSensorId] = useState("");

  const handleSensorChange = (event) => {
    setSelectedSensorId(event.target.value);
    const selectedSensor = sensors.find(
      (sensor) => sensor.id === Number(event.target.value)
    );
    setSelectedSensors([...selectedSensors, selectedSensor]);
  };

  const handleRemoveSensor = (sensorToRemove) => {
    setSelectedSensors(
      selectedSensors.filter((sensor) => sensor.id !== sensorToRemove.id)
    );
    if (sensorToRemove.id === Number(selectedSensorId)) {
      setSelectedSensorId("");
    }
  };

  const availableSensors = sensors.filter(
    (sensor) => !selectedSensors.some((selected) => selected.id === sensor.id)
  );

  return (
    <div>
      <p>Sensors</p>
      {availableSensors.length > 0 ? (
        <select value={selectedSensorId} onChange={handleSensorChange}>
          <option value="" disabled>
            Select sensors
          </option>
          {availableSensors.map((sensor) => (
            <option key={sensor.id} value={sensor.id}>
              {sensor.name}
            </option>
          ))}
        </select>
      ) : (
        <p>No sensors available</p>
      )}
      {selectedSensors.length > 0 ? (
        <ul>
          {selectedSensors.map((sensor, index) => (
            <li key={index}>
              {sensor.name}
              <button onClick={() => handleRemoveSensor(sensor)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No sensors selected</p>
      )}
    </div>
  );
};

export default SensorSelection;
