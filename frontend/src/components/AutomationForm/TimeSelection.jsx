import PropTypes from "prop-types";
import styles from "./CreateAutomation.module.css";

const TimeSelection = ({ time, setTime }) => (
  <input
    type="time"
    value={time}
    onChange={(e) => setTime(e.target.value)}
    className={styles.timeInput}
    data-testid="time-input"
  />
);

TimeSelection.propTypes = {
  time: PropTypes.string.isRequired,
  setTime: PropTypes.func.isRequired,
};

export default TimeSelection;
