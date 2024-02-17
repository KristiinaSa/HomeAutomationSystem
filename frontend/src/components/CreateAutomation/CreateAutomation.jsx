import { useState } from "react";

import { DaySelection } from "./DaySelection";
import { TimeSelection } from "./TimeSelection";

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { selectedDays, time };
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
      <button type="submit">Create New Automation</button>
    </form>
  );
};
