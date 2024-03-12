import styles from "./CreateAutomation.module.css";

const ActionType = ({ action, setAction }) => {
  return (
    <div className={styles.action}>
      <p>Actions</p>
      <select value={action} onChange={(e) => setAction(e.target.value)}>
        <option value="">Select an action</option>
        <option value="Turn On">Turn On</option>
        <option value="Turn Off">Turn Off</option>
      </select>
    </div>
  );
};

export default ActionType;
