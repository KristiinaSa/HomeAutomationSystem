import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  deleteAutomation,
  getAutomation,
  updateAutomation,
  addAutomation,
} from "../../services/automationServices";

import TimerAutomationForm from "./TimerAutomationForm";
import SensorAutomationForm from "./SensorAutomationForm";

import styles from "./CreateAutomation.module.css";

export const AutomationForm = () => {
  const { id } = useParams();
  const [automation, setAutomation] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAutomation = async () => {
      try {
        const automation = await getAutomation(id);
        setAutomation(automation);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAutomation();
  }, [id]);

  const handleSubmit = async (data, id) => {
    if (id) {
      console.log("Updating automation");
      await updateAutomation(id, data);
    } else {
      console.log("Creating new automation");
      await addAutomation(data);
    }
    console.log(data);
    navigate("/automations");
  };

  const handleDelete = async (id) => {
    try {
      await deleteAutomation(id);
      navigate("/automations");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div></div>;
  }

  return (
    <div className={styles.formContainer}>
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
        <TimerAutomationForm
          id={id}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          automation={automation}
        />
      ) : (
        <SensorAutomationForm
          id={id}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          automation={automation}
        />
      )}
    </div>
  );
};
