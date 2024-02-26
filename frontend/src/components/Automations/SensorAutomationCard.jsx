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
    <div key={automation.id}>
      <h2>{automation.name}</h2>
      <p>{automation.sensor.name} sensor</p>
      <p>{automation.isDisabled ? "Disabled" : `${numDevices} accessories`}</p>
      <p>Action: {automation.action}</p>
      <a
        onClick={handleEdit}
        aria-label="Edit"
        className={styles["edit-button"]}
      >
        <FontAwesomeIcon icon="fa-solid fa-chevron-right" size="xl" />
      </a>
    </div>
  );
};
