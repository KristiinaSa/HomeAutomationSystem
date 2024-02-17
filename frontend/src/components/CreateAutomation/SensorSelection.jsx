const SensorSelection = ({ sensors, selectedSensors, setSelectedSensors }) => {
  const handleSensorChange = (event) => {
    const selectedSensor = sensors.find(
      (sensor) => sensor.id === Number(event.target.value)
    );
    setSelectedSensors([...selectedSensors, selectedSensor]);
  };

  const handleRemoveSensor = (sensorToRemove) => {
    setSelectedSensors(
      selectedSensors.filter((sensor) => sensor.id !== sensorToRemove.id)
    );
  };

  const availableSensors = sensors.filter(
    (sensor) => !selectedSensors.some((selected) => selected.id === sensor.id)
  );

  return (
    <div>
      <p>Sensors</p>
      <select onChange={handleSensorChange}>
        <option value="" disabled selected>
          Select a sensor
        </option>
        {availableSensors.map((sensor) => (
          <option key={sensor.id} value={sensor.id}>
            {sensor.name}
          </option>
        ))}
      </select>
      <ul>
        {selectedSensors.map((sensor, index) => (
          <li key={index}>
            {sensor.name}
            <button onClick={() => handleRemoveSensor(sensor)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SensorSelection;
