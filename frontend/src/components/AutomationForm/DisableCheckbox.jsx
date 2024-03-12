import styles from "./CreateAutomation.module.css";

export const DisableCheckbox = ({
  automation,
  isDisabled,
  handleCheckboxChange,
}) => {
  return (
    automation && (
      <label className={styles.disableCheckbox}>
        Disable automation:
        <input
          type="checkbox"
          checked={isDisabled}
          onChange={handleCheckboxChange}
        />
      </label>
    )
  );
};
