import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <label htmlFor="themeToggle" className={styles.switch}>
      <input
        id="themeToggle"
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
        data-testid="theme-toggle"
        aria-labelledby="themeToggleLabel"
      />
      <div className={styles.slider} data-testid="slider">
        <div
          className={`${styles.circle} ${
            theme === "dark"
              ? styles["circle-dark"] + " " + styles.move
              : styles["circle-light"]
          }`}
          data-testid="circle"
        >
          <FontAwesomeIcon
            icon={theme === "dark" ? faMoon : faSun}
            className={`${styles.icon} ${
              theme === "dark" ? styles.moon : styles.sun
            }`}
          />
        </div>
      </div>
      <span id="themeToggleLabel" style={{ display: "none" }}>
        Theme Toggle
      </span>
    </label>
  );
};

export default ThemeToggle;
