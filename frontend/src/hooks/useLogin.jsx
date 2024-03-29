import { useState, useContext } from "react";
import authService from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../context/LanguageContext";

const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const { updateLanguage } = useContext(LanguageContext);

  const login = async (email, password) => {
    if (!email || !password) {
      setErrorMessage(t("Please fill in all the fields."));
      return;
    }
    try {
      const response = await authService.login(email, password);
      localStorage.setItem("access_token", response.token);
      const theme = response.using_darkmode ? "dark" : "light";
      localStorage.setItem("theme", theme);
      setTheme(theme);
      updateLanguage(response.language);
      setLoginSuccess(true);
      setIsLoggedIn(true);
    } catch (error) {
      if (error.response) {
        setErrorMessage(t(error.response.data.message));
      } else if (error.request) {
        setErrorMessage(t("No response from server. Please try again later."));
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  return {
    login,
    errorMessage,
    loginSuccess,
    setErrorMessage,
    setLoginSuccess,
  };
};

export default useLogin;
