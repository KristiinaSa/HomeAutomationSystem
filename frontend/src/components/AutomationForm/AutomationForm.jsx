import { useState } from "react";

import { useParams } from "react-router-dom";
import TimerAutomationForm from "./TimerAutomationForm";
import SensorAutomationForm from "./SensorAutomationForm";

export const AutomationForm = () => {
  const { id } = useParams();
  const [mode, setMode] = useState("timer"); // 'timer' or 'sensor'

  return (
    <div>
      {!id && (
        <>
          <button onClick={() => setMode("timer")}>Timer Mode</button>
          <button onClick={() => setMode("sensor")}>Sensor Mode</button>
        </>
      )}

      {mode === "timer" ? (
        <TimerAutomationForm id={id} />
      ) : (
        <SensorAutomationForm id={id} />
      )}
    </div>
  );
};
