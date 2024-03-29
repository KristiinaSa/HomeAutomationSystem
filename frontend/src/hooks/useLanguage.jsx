import { useState, useEffect } from "react";
import { getLanguages, setLanguage } from "../services/userServices";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useLanguage = () => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("i18nextLng") || "en"
  );
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
    const selectedLanguage = languages.find(
      (language) => language.code === newLanguageCode
    );

    try {
      if (isLoggedIn) {
        await setLanguage(selectedLanguage);
      }
      setSelectedLanguage(newLanguageCode);
      localStorage.setItem("i18nextLng", newLanguageCode);
      i18n.changeLanguage(newLanguageCode);
    } catch (error) {
      console.error(error);
    }
  };

  return { languages, selectedLanguage, handleLanguageChange, t };
};

export default useLanguage;
