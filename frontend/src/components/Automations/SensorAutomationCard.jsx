import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Automations.module.css";
import { useLanguage } from "../../context/LanguageContext";
import PropTypes from "prop-types";

export const SensorAutomationCard = ({ automation }) => {
  const navigate = useNavigate();
  const numDevices = automation.devices ? automation.devices.length : 0;
  const { t } = useLanguage();

  const handleEdit = () => {
    navigate(`/automations/edit/${automation.id}`);
  };

  return (
    <div key={automation.id} data-testid="automation-card">
      <h2 data-testid="automation-name">{automation.name}</h2>
      <p data-testid="automation-sensor">{automation.sensor.name} sensor</p>
      <p data-testid="automation-status">
        {automation.disabled ? "Disabled" : `${numDevices} accessories`}
      </p>
      <p data-testid="automation-action">
        {t("action")}: {automation.action}
      </p>
      <button
        onClick={handleEdit}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            handleEdit();
          }
        }}
        aria-label="Edit"
        className={styles["edit-button"]}
        data-testid="edit-button"
      >
        <FontAwesomeIcon icon="fa-solid fa-chevron-right" size="xl" />
      </button>
    </div>
  );
};

SensorAutomationCard.propTypes = {
  automation: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sensor: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    devices: PropTypes.array,
    disabled: PropTypes.bool.isRequired,
    action: PropTypes.string.isRequired,
  }).isRequired,
};
