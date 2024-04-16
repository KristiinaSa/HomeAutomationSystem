import ThemeToggle from "../components/ThemeToggle";
import Users from "../components/Users";
import LanguagePicker from "../components/LanguagePicker";
import { useLanguage } from "../context/LanguageContext";
import "./SettingsPage.css";

const SettingsPage = () => {
  const { t } = useLanguage();
  return (
    <div className="settings-container">
      <h1>{t("settings")}</h1>
      <ThemeToggle />
      <LanguagePicker />
      <Users />
    </div>
  );
};

export default SettingsPage;
