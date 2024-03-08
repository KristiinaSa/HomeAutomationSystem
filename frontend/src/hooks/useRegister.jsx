import authService from "../services/authService";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";
import { AuthContext } from "../AuthContext";

const useRegister = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const { setTheme } = useContext(ThemeContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const register = async (name, email, password) => {
    if (!email || !password || !name) {
      setErrorMessage("Please fill in all the fields");
      return;
    }
    try {
      const response = await authService.register(name, email, password);
      const theme = response.using_darkmode ? "dark" : "light";
      localStorage.setItem("theme", theme);
      setTheme(theme);
      setRegisterSuccess(true);
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
    console.log("registerSuccess updated:", registerSuccess);
  }, [registerSuccess]);

  useEffect(() => {
    console.log("useEffect called, registerSuccess:", registerSuccess);
    if (registerSuccess) {
      console.log("registerSuccess", registerSuccess);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [registerSuccess, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("isLoggedIn", isLoggedIn);
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return {
    register,
    errorMessage,
    registerSuccess,
    setErrorMessage,
    setRegisterSuccess,
  };
};

export default useRegister;
