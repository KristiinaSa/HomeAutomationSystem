import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    
    return (
        <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={() => toggleTheme()}
            ></input>
    );
    }

    export default ThemeToggle;