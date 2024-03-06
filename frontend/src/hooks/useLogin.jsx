import { useState, useContext, useEffect } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { ThemeContext } from "../ThemeContext";

const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const login = async (email, password) => {
    if (!email || !password) {
      setErrorMessage("Please fill in all the fields");
      return;
    }
    try {
      const response = await authService.login(email, password);
      console.log("FAFA");
      localStorage.setItem("access_token", response.token);
      const theme = response.using_darkmode ? "dark" : "light";
      localStorage.setItem("theme", theme);
      console.log("GAGA");
      setTheme(theme);
      console.log("DADA");
      setLoginSuccess(true);
      console.log("SASA");
      setIsLoggedIn(true);
      console.log("YE");
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

  useEffect(() => {
    console.log("loginSuccess updated:", loginSuccess);
  }, [loginSuccess]);

  useEffect(() => {
    console.log("useEffect called, loginSuccess:", loginSuccess);
    if (loginSuccess) {
      console.log("loginSuccess", loginSuccess);
      navigate("/");
    }
  }, [loginSuccess, navigate]);

  return {
    login,
    errorMessage,
    loginSuccess,
    setErrorMessage,
    setLoginSuccess,
  };
};

export default useLogin;
