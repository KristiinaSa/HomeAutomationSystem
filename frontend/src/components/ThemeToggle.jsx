import styles from "./ThemeToggle.module.css";
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <label className={styles.switchContainer}>
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <span className={`${styles.switch} ${styles.round}`}></span>
    </label>
  );
};

export default ThemeToggle;
