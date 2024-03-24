import { useEffect, useState } from "react";
import { getLanguages, setLanguage } from "../services/userServices";
import { useTranslation } from "react-i18next";

export const LanguagePicker = () => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("i18nextLng") || "en"
  );
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await getLanguages();
        setLanguages(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLanguages();
  }, []);

  const handleLanguageChange = async (event) => {
    const newLanguageCode = event.target.value;
    const selectedLanguage = languages.find(
      (language) => language.code === newLanguageCode
    );

    try {
      await setLanguage(selectedLanguage);
      setSelectedLanguage(newLanguageCode);
      localStorage.setItem("i18nextLng", newLanguageCode);
      i18n.changeLanguage(newLanguageCode);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>{t("Choose a language")}:</h2>
      <select value={selectedLanguage} onChange={handleLanguageChange}>
        {languages.map((language) => (
          <option key={language.id} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default LanguagePicker;
