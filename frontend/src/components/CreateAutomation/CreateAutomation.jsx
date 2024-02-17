import { useEffect, useState } from "react";

import DaySelection from "./DaySelection";
import TimeSelection from "./TimeSelection";
import SensorSelection from "./SensorSelection";

import { dummySensors } from "../../dummyData/dummySensor";

export const CreateAutomation = () => {
  const [time, setTime] = useState("");
  const [selectedDays, setSelectedDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const [sensors, setSensors] = useState([]);
  const [selectedSensors, setSelectedSensors] = useState([]);

  useEffect(() => {
    const fetchSensors = async () => {
      setTimeout(() => {
        setSensors(dummySensors);
      }, 1000);
    };
    fetchSensors();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { selectedDays, time, selectedSensors };
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Time</p>
      <TimeSelection time={time} setTime={setTime} />
      <DaySelection
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
      <SensorSelection
        sensors={sensors}
        selectedSensors={selectedSensors}
        setSelectedSensors={setSelectedSensors}
      />
      <button type="submit">Create New Automation</button>
    </form>
  );
};
