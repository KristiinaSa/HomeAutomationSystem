import { createContext, useState, useEffect } from "react";
import { getDevices } from "../services/accessoryServices";

export const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [update, setUpdate] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const devices = await getDevices();
        setDevices(devices);
        setUpdate(false);
      } catch (error) {
        console.log(error);
        setErrorMsg("Whoops! We had a little trouble getting your devices. Let's give it another whirl in a bit.");
      }
    };
    fetchDevices();
  }, [update]);

  return (
    <DeviceContext.Provider value={{ devices, setDevices, update, setUpdate, errorMsg}}>{children}</DeviceContext.Provider>
  );
};