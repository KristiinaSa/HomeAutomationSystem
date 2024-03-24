import styles from "./CreateAutomation.module.css";
import { useTranslation } from "react-i18next";

const DaySelection = ({ selectedDays, setSelectedDays }) => {
  const { t } = useTranslation();

  const handleCheckboxChange = (event) => {
    setSelectedDays({
      ...selectedDays,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className={styles.horizontalLayout} data-testid="days-input">
      {Object.keys(selectedDays).map((day) => (
        <label
          key={day}
          className={`${styles.dayCheckbox} ${
            selectedDays[day] ? styles.selected : ""
          }`}
        >
          <input
            type="checkbox"
            name={day}
            checked={selectedDays[day]}
            onChange={handleCheckboxChange}
            className={styles.srOnly}
          />
          {t(day.charAt(0).toUpperCase() + day.slice(1))}{" "}
        </label>
      ))}
    </div>
  );
};

export default DaySelection;
