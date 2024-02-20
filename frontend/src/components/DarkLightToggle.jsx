import styles from "./DarkLightToggle.module.css";
import { useDarkMode } from "../contexts/DarkLightProvider";

const DarkLightToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <label className={styles.switchContainer}>
      <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
      <span className={`${styles.switch} ${styles.round}`}></span>
    </label>
  );
};

export default DarkLightToggle;
