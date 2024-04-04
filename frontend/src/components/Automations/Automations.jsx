import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { getAutomations } from "../../services/automationServices";

import { TimerAutomationCard } from "./TimerAutomationCard";
import { SensorAutomationCard } from "./SensorAutomationCard";

import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/AuthContext";

import styles from "./Automation.module.css";


export const Automations = () => {
  const [automations, setAutomations] = useState([]);
  const { t } = useTranslation();
  const { role } = useContext(AuthContext);

  useEffect(() => {
    const fetchAutomations = async () => {
      try {
        const data = await getAutomations();
        setAutomations(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAutomations();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <h1>{t("automations")}</h1>
      <div
        className={styles.automationContainer}
        data-testid="automation-container"
      >
        {automations.map((automation) =>
          automation.type === "timer" ? (
            <div
              key={automation.id}
              data-testid={`timer-automation-${automation.id}`}
              className={styles.automationCard}
            >
              <TimerAutomationCard automation={automation} />
            </div>
          ) : (
            <div
              key={automation.id}
              data-testid={`sensor-automation-${automation.id}`}
            >
              <SensorAutomationCard automation={automation} />
            </div>
          )
        )}
      </div>
      {role === 'admin' && (
      <Link to="/automations/new" data-testid="create-automation-button">
        <button className="primary-btn">{t("create new automation")}</button>
      </Link>
      )}
    </div>
  );
};
