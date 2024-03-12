import authService from "../services/authService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const navigate = useNavigate();

  const register = async (name, email, password) => {
    if (!email || !password || !name) {
      setErrorMessage("Please fill in all the fields");
      return;
    }
    try {
      await authService.register(name, email, password);
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

  useEffect(() => {}, [registerSuccess]);

  useEffect(() => {
    if (registerSuccess) {
      setTimeout(() => {}, 3000);
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
