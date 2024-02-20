import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TimerAutomationForm from "./TimerAutomationForm";
import SensorAutomationForm from "./SensorAutomationForm";
import styles from "./CreateAutomation.module.css";

import { dummyAutomations } from "../../dummyData/dummyAutomations";


export const AutomationForm = () => {
  const { id } = useParams();
  const [automation, setAutomation] = useState(null);

  useEffect(() => {
    const automation = dummyAutomations.find((item) => item.id == id);
    setAutomation(automation);
  }, [id]);

  return (
    <div className={styles.formContainer}>
      {!id && (
        <>
          <button
            onClick={() =>
              setAutomation({
                ...automation,
                automationType: "timer",
                isDisabled: automation ? automation.isDisabled : false,
              })
            }
          >
            Timer Mode
          </button>
          <button
            onClick={() =>
              setAutomation({
                ...automation,
                automationType: "sensor",
                isDisabled: automation ? automation.isDisabled : false,
              })
            }
          >
            Sensor Mode
          </button>
        </>
      )}

      <label>
        <input
          type="checkbox"
          checked={automation ? automation.isDisabled : false}
          disabled
        />
        Disabled Checkbox
      </label>

      {automation && automation.automationType === "timer" ? (
        <TimerAutomationForm id={id} />
      ) : (
        <SensorAutomationForm id={id} />
      )}
    </div>
  );
};
