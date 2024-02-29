import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import {
  deleteAutomation,
  updateTimerAutomation,
  addTimerAutomation,
  getTimerAutomation,
} from "../../services/automationServices";

import TimerAutomationForm from "./TimerAutomationForm";
import SensorAutomationForm from "./SensorAutomationForm";

import styles from "./CreateAutomation.module.css";

export const AutomationForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const automationType = location.state ? location.state.automationType : null; // PAYING FOR BAD DESIGN DECISIONS WITH THIS
  const [automation, setAutomation] = useState();
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState("timer");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAutomation = async () => {
      try {
        if (automationType === "timer") {
          setLoading(true);
          const automation = await getTimerAutomation(id);
          setAutomation(automation);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (id) {
      fetchAutomation();
    }
  }, [id, automationType]);

  const handleSubmit = async (data, id) => {
    if (id) {
      if (data.type === "timer") {
        await updateTimerAutomation(id, data);
        console.log("Updating timer-based automation");
      }
    } else {
      if (data.type === "timer") {
        console.log("Creating new automation");
        await addTimerAutomation(data);
      }
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
      {!id && (
        <>
          <button onClick={() => setFormType("timer")}>Timer Mode</button>
          <button onClick={() => setFormType("sensor")}>Sensor Mode</button>
        </>
      )}

      {automation ? (
        automation.type === "timer" ? (
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
        )
      ) : formType === "timer" ? (
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
