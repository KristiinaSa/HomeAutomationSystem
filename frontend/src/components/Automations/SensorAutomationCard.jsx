import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Automations.module.css";

export const SensorAutomationCard = ({ automation }) => {
  const navigate = useNavigate();
  const numDevices = automation.devices ? automation.devices.length : 0;

  const handleEdit = () => {
    navigate(`/automations/edit/${automation.id}`);
  };

  return (
    <div key={automation.id} data-testid="automation-card">
      <h2 data-testid="automation-name">{automation.name}</h2>
      <p data-testid="automation-sensor">{automation.sensor.name} sensor</p>
      <p data-testid="automation-status">
        {automation.isDisabled ? "Disabled" : `${numDevices} accessories`}
      </p>
      <p data-testid="automation-action">Action: {automation.action}</p>
      <a
        onClick={handleEdit}
        aria-label="Edit"
        className={styles["edit-button"]}
        data-testid="edit-button"
      >
        <FontAwesomeIcon icon="fa-solid fa-chevron-right" size="xl" />
      </a>
    </div>
  );
};
