import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import "./LanguagePicker.css";

export const LanguagePicker = () => {
  const { languages, selectedLanguage, handleLanguageChange, t } =
    useContext(LanguageContext);

  return (
    <div className="language-container" data-testid="language-container">
      <h2 data-testid="language-title">{t("Choose a language")}:</h2>
      <select
        value={selectedLanguage}
        onChange={(event) => handleLanguageChange(event.target.value)}
        className="language-picker"
        data-testid="language-picker"
      >
        {languages.map((language) => (
          <option
            key={language.id}
            value={language.code}
            data-testid={`language-option-${language.code}`}
          >
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguagePicker;
