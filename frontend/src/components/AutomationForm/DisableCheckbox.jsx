import styles from "./CreateAutomation.module.css";
import { useTranslation } from "react-i18next";

export const DisableCheckbox = ({
  automation,
  isDisabled,
  handleCheckboxChange,
}) => {
  const { t } = useTranslation();

  return (
    automation && (
      <div className={styles.disableCheckbox}>
        <div className={styles.textContainer}>{t("disable automation")}:</div>
        <div className={styles.checkBoxContainer}>
          <input
            type="checkbox"
            checked={isDisabled}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>
    )
  );
};
