import { createContext, useState, useEffect } from "react";
import { getDevices } from "../services/accessoryServices";

export const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const devices = await getDevices();
        setDevices(devices);
        setUpdate(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDevices();
  }, [update]);

  return (
    <DeviceContext.Provider value={{ devices, setDevices, update, setUpdate}}>{children}</DeviceContext.Provider>
  );
};