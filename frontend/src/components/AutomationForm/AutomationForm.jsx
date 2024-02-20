import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TimerAutomationForm from "./TimerAutomationForm";
import SensorAutomationForm from "./SensorAutomationForm";
import { dummyAutomations } from "../../dummyData/dummyAutomations";

export const AutomationForm = () => {
  const { id } = useParams();
  const [automation, setAutomation] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const automation = dummyAutomations.find((item) => item.id == id);
    setAutomation(automation);
    setLoading(false);
  }, [id]);

  const handleSubmit = async (data, id) => {
    if (id) {
      console.log("Updating automation", id);
    } else {
      console.log("Creating new automation");
    }
    console.log(data);
    navigate("/automations");
  };

  if (loading) {
    return <div></div>;
  }

  return (
    <div>
      {!id && automation && !automation.automationType && (
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
        <TimerAutomationForm id={id} handleSubmit={handleSubmit} />
      ) : (
        <SensorAutomationForm id={id} handleSubmit={handleSubmit} />
      )}
    </div>
  );
};
