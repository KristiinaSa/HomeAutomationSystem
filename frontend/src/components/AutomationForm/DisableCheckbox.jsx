import PropTypes from "prop-types";
import styles from "./CreateAutomation.module.css";
import { useLanguage } from "../../context/LanguageContext";

export const DisableCheckbox = ({
  automation,
  isDisabled,
  handleCheckboxChange,
}) => {
  const { t } = useLanguage();

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

DisableCheckbox.propTypes = {
  automation: PropTypes.object,
  isDisabled: PropTypes.bool.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};
