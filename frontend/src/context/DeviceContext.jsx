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
        setErrorMsg(
          "Whoops! We had a little trouble getting your devices. Let's give it another whirl in a bit."
        );
      }
    };
    fetchDevices();
  }, [update]);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const eventSource = new EventSource(
      `/api/v1/accessories/status?access_token=${accessToken}`
    );
    eventSource.onmessage = (event) => {
      // Set update to true to trigger the useEffect hook that fetches the devices
      setUpdate(true);
    };
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <DeviceContext.Provider
      value={{ devices, setDevices, update, setUpdate, errorMsg }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
