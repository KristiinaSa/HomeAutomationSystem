import { useState } from "react";
import authService from "../services/authService";

const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const login = async (email, password) => {
    if (!email || !password) {
      setErrorMessage("Please fill in all the fields");
      return;
    }

    try {
      const response = await authService.login(email, password);
      localStorage.setItem("access_token", response.token);
      setLoginSuccess(true);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        setErrorMessage("No response from server. Please try again later.");
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
