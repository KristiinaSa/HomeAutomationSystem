import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const emailRef = useRef();
  const errorRef = useRef();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (loginSuccess) {
      setTimeout(() => {
        setIsLoggedIn(true);
        navigate("/");
        setLoginSuccess(false);
      }, 3000);
    }
  }, [loginSuccess, navigate, setIsLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all the fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
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

  return (
    <div>
      <form className="login-form">
        <h1>Log in</h1>
        <label htmlFor="email">Email</label>
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          ref={emailRef}
          autoComplete="email"
          id="email"
          name="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          id="password"
          name="password"
          required
        />
        <button
          className="login-submit-button"
          type="submit"
          onClick={handleSubmit}
          disabled={loginSuccess}
        >
          LOG IN
        </button>
        <p className="login-register-router">
          Don't have an account? <a href="/register">Register</a>
        </p>
        <p
          ref={errorRef}
          className={errorMessage ? "error-messagge" : "off-screen"}
          aria-live="assertive"
        >
          {errorMessage}
        </p>
        {loginSuccess && (
          <p aria-live="assertive">
            Log in succesfull! Redirecting to home page...
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
