import { useContext } from "react";
import { DeviceContext } from "../context/DeviceContext";
import { toggleOnOff } from "../services/accessoryServices";

const useToggle = () => {
  const { devices, setDevices } = useContext(DeviceContext);
  console.log(categories);
  console.log(rooms);
  console.log(devices);

  const handleToggle = async (id) => {
    try {
      const device = await toggleOnOff(id);
      console.log("Toggled device:", device);
      const updatedDevices = devices.map((d) =>
        d.id === device.id ? { ...d, value: device.value } : d
      );
      setDevices(updatedDevices);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleToggle,
  };
};

export default useToggle;
