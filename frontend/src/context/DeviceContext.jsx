import { createContext, useState, useEffect, useContext } from "react";
import { getDevices } from "../services/accessoryServices";
import { AuthContext } from "./AuthContext";

export const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [update, setUpdate] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { isLoggedIn } = useContext(AuthContext);

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
    if (isLoggedIn) {
      fetchDevices();
    }
  }, [update, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      const accessToken = localStorage.getItem("access_token");
      const eventSource = new EventSource(
        `/api/v1/accessories/status?access_token=${accessToken}`
      );
      eventSource.onmessage = () => {
        setUpdate(true);
      };
      return () => {
        eventSource.close();
      };
    }
  }, [isLoggedIn]);

  return (
    <DeviceContext.Provider
      value={{ devices, setDevices, update, setUpdate, errorMsg }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
