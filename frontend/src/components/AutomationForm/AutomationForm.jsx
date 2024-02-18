import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AutomationsContext } from "../../context/AutomationsContext";

import DaySelection from "./DaySelection";
import TimeSelection from "./TimeSelection";
import SensorSelection from "./SensorSelection";

import { dummySensors } from "../../dummyData/dummySensor";

export const AutomationForm = () => {
  const { id: urlId } = useParams();
  const navigate = useNavigate();
  const { automations } = useContext(AutomationsContext);
  console.log(automations);
  const id = Number(urlId);

  const automation = automations.find((automation) => automation.id === id);
  console.log("MAUTION", automation.selectedDays);

  const [time, setTime] = useState(automation?.time || "");
  const [selectedDays, setSelectedDays] = useState(
    automation?.weekdays || {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    }
  );

  const [sensors, setSensors] = useState([]);
  const [selectedSensors, setSelectedSensors] = useState(
    automation?.selectedSensors || []
  );

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
    if (id) {
      console.log("Updating automation", id);
    } else {
      console.log("Creating new automation");
    }
    console.log(data);
    navigate("/automations");
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
      <button type="submit">
        {automation ? "Update Automation" : "Create New Automation"}
      </button>
    </form>
  );
};
