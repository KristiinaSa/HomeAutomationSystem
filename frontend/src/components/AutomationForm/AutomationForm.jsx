import { useState } from "react";

import { useParams } from "react-router-dom";
import TimerAutomationForm from "./TimerAutomationForm";
import SensorAutomationForm from "./SensorAutomationForm";
import styles from "./CreateAutomation.module.css";

export const AutomationForm = () => {
  const { id } = useParams();
  const [mode, setMode] = useState("timer"); // 'timer' or 'sensor'

  return (
    <div className={styles.formContainer}>
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
