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
      <p>{numDevices} devices</p>
      <p>Time: {automation.time}</p>
      <p>Disabled: {automation.isDisabled ? "Yes" : "No"}</p>
      <p>Action: {automation.actionType}</p>
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
