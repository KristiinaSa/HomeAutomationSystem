import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TimerAutomationForm from "./TimerAutomationForm";
import SensorAutomationForm from "./SensorAutomationForm";
import { dummyAutomations } from "../../dummyData/dummyAutomations";

export const AutomationForm = () => {
  const { id } = useParams();
  const [automation, setAutomation] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const automation = dummyAutomations.find((item) => item.id == id);
    setAutomation(automation);
    if (automation) {
      setIsDisabled(automation.isDisabled);
    }
  }, [id]);

  return (
    <div>
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

      {automation && automation.automationType === "timer" ? (
        <TimerAutomationForm id={id} />
      ) : (
        <SensorAutomationForm id={id} />
      )}
    </div>
  );
};
