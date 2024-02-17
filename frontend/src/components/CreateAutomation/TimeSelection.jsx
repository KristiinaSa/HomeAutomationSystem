import styles from "./CreateAutomation.module.css";

const TimeSelection = ({ time, setTime }) => (
  <label>
    <input
      type="time"
      value={time}
      onChange={(e) => setTime(e.target.value)}
      className={styles.timeInput}
    />
  </label>
);

export default TimeSelection;
