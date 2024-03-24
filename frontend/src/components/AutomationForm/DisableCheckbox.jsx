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
      <label className={styles.disableCheckbox}>
        {t("disable automation")}:
        <input
          type="checkbox"
          checked={isDisabled}
          onChange={handleCheckboxChange}
        />
      </label>
    )
  );
};
