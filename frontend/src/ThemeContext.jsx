import { createContext, useState, useEffect } from "react";
import { themeToggler } from "./services/userServices";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? true : false;
    try {
      const response = await themeToggler({ theme: newTheme });
      if (response.using_darkmode === newTheme) {
        const themeString = newTheme ? "dark" : "light";
        localStorage.setItem("theme", themeString);
        setTheme(themeString);
      } else {
        console.error(
          "Failed to update theme in database: received theme",
          response.using_darkmode
        );
      }
    } catch (error) {
      console.error("Failed to update theme in database:", error);
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);

  useEffect(() => {
    console.log("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
