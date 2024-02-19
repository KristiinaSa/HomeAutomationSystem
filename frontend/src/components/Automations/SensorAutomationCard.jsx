export const SensorAutomationCard = ({ automation }) => {
  return (
    <div>
      <h2>{automation.name}</h2>
      <p>Time: {automation.time}</p>
      <p>Disabled: {automation.isDisabled ? "Yes" : "No"}</p>
      <p>Action: {automation.actionType}</p>
      <h3>Sensors:</h3>
      {automation.sensors.map((sensor) => (
        <p key={sensor.id}>
          {sensor.name} ({sensor.type})
        </p>
      ))}
      <h3>Devices:</h3>
      {automation.devices.map((device) => (
        <p key={device.id}>
          {device.name} ({device.type})
        </p>
      ))}
    </div>
  );
};
