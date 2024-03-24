import ThemeToggle from "../components/ThemeToggle";
import Users from "../components/Users";
import LanguagePicker from "../components/LanguagePicker";
import "./SettingsPage.css";

const SettingsPage = () => {
  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <LanguagePicker />
      <ThemeToggle />
      <Users />
    </div>
  );
};

export default SettingsPage;
