import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getAutomations } from "../../services/automationServices";

import { TimerAutomationCard } from "./TimerAutomationCard";
import { SensorAutomationCard } from "./SensorAutomationCard";

import styles from "./Automation.module.css";

export const Automations = () => {
  const [automations, setAutomations] = useState([]);

  useEffect(() => {
    const fetchAutomations = async () => {
      try {
        const data = await getAutomations();
        setAutomations(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAutomations();
  }, []);

  return (
    <div className={styles.automationContainer}>
      {automations.map((automation) =>
        automation.type === "timer" ? (
          <TimerAutomationCard key={automation.id} automation={automation} />
        ) : (
          <SensorAutomationCard key={automation.id} automation={automation} />
        )
      )}
      <Link to="/automations/new">
        <button>Create New Automation</button>
      </Link>
    </div>
  );
};
