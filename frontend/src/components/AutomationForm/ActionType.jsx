import styles from "./CreateAutomation.module.css";

import { useLanguage } from "../../context/LanguageContext";

const ActionType = ({ action, setAction }) => {
  const { t } = useLanguage();
  return (
    <div className={styles.action}>
      <p>{t("devices")}</p>
      <select value={action} onChange={(e) => setAction(e.target.value)}>
        <option value="">{t("select an action")}</option>
        <option value="Turn On">{t("turn on")}</option>
        <option value="Turn Off">{t("turn off")}</option>
      </select>
    </div>
  );
};

export default ActionType;
