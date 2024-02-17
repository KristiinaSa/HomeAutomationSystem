import styles from "./CreateAutomation.module.css";

const DaySelection = ({ selectedDays, setSelectedDays }) => {
  const handleCheckboxChange = (event) => {
    setSelectedDays({
      ...selectedDays,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
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
          {day.charAt(0).toUpperCase()}{" "}
        </label>
      ))}
    </>
  );
};

export default DaySelection;
