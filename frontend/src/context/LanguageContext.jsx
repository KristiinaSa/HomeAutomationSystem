import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
import { getLanguages, setLanguage } from "../services/userServices";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";

export const LanguageContext = createContext();

const mapLanguageCode = (code) => {
  return code.includes("-") ? code.split("-")[0] : code;
};

export const LanguageProvider = ({ children }) => {
  const [languages, setLanguages] = useState([]);
  const initialLanguage = mapLanguageCode(
    localStorage.getItem("i18nextLng") || "en"
  );
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const { t, i18n } = useTranslation();
  const { isLoggedIn } = useContext(AuthContext);

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

  const handleLanguageChange = async (newLanguageCode) => {
    const simplifiedLanguageCode = mapLanguageCode(newLanguageCode);
    const selectedLanguage = languages.find(
      (language) => language.code === simplifiedLanguageCode
    );

    try {
      if (isLoggedIn) {
        await setLanguage(selectedLanguage);
      }
      setSelectedLanguage(simplifiedLanguageCode);
      localStorage.setItem("i18nextLng", simplifiedLanguageCode);
      i18n.changeLanguage(simplifiedLanguageCode);
    } catch (error) {
      console.error(error);
    }
  };

  const updateLanguage = (newLanguageCode) => {
    const simplifiedLanguageCode = mapLanguageCode(newLanguageCode);
    setSelectedLanguage(simplifiedLanguageCode);
    localStorage.setItem("i18nextLng", simplifiedLanguageCode);
    i18n.changeLanguage(simplifiedLanguageCode);
  };

  return (
    <LanguageContext.Provider
      value={{
        languages,
        selectedLanguage,
        handleLanguageChange,
        updateLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
