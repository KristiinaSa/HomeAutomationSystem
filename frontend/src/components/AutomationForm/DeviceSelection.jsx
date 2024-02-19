import { useState } from "react";

const DeviceSelection = ({ devices, selectedDevices, setSelectedDevices }) => {
  const [selectedDeviceId, setSelectedDeviceId] = useState("");

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
    <div>
      <p>Devices</p>
      {availableDevices.length > 0 ? (
        <select value={selectedDeviceId} onChange={handleDeviceChange}>
          <option value="" disabled>
            Select devices
          </option>
          {availableDevices.map((device) => (
            <option key={device.id} value={device.id}>
              {device.name}
            </option>
          ))}
        </select>
      ) : (
        <p>No devices available</p>
      )}
      {selectedDevices.length > 0 ? (
        <ul>
          {selectedDevices.map((device, index) => (
            <li key={index}>
              {device.name}
              <button onClick={() => handleRemoveDevice(device)}>Remove</button>
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
