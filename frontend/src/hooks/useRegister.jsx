import authService from "../services/authService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const useRegister = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const register = async (
    name,
    email,
    password,
    isNewSystem,
    timeZone,
    systemName
  ) => {
    if (!email || !password || !name) {
      setErrorMessage(t("Please fill in all the fields."));
      return;
    }
    try {
      if (isNewSystem) {
        await authService.createSystem(
          name,
          email,
          password,
          timeZone,
          systemName
        );
      } else {
        await authService.joinSystem(name, email, password);
      }
      setRegisterSuccess(true);
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

  useEffect(() => {
    if (registerSuccess) {
      navigate("/login");
    }
  }, [registerSuccess, navigate]);

  return {
    register,
    errorMessage,
    registerSuccess,
    setErrorMessage,
    setRegisterSuccess,
  };
};

export default useRegister;
