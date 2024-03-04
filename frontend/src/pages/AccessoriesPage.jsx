import { getDevices } from "../services/accessoryServices";
import { useState, useEffect } from "react";
import './AccessoriesPage.css';

const AccessoriesPage = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const devices = await getDevices();
        setDevices(devices);
        console.log("Devices from database:", devices);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDevices();
  }, []);

  return (
    <div className="accessories-container">
      <h1>Accessories</h1>
      <button type="button">Show analytics</button>
      <div>
        <div>
          <h4>Devices</h4>
          <button type="button">Add device</button>
        </div>
        <div>
          {devices.map((device) => (
            <div key={device.id}>
              <p>{device.name}</p>
              <p>{device.type}</p>
              <p>{device.status}</p>
              <button type="button">Edit</button>
              <button type="button">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessoriesPage;
