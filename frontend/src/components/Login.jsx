import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import useLogin from "../hooks/useLogin";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isReady, setIsReady] = useState(false);
  const { login, errorMessage, loginSuccess, setErrorMessage } = useLogin();
  const { t, i18n } = useTranslation();

  const emailRef = useRef();
  const errorRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, setErrorMessage]);

  useEffect(() => {
    const handleResources = () => {
      setIsReady(true);
    };
    const unsubscribe = i18n.on("resourcesLoaded", handleResources);
    return unsubscribe;
  }, [i18n]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div>
      {isReady ? (
        <form className="login-form">
          <h1>{t("login")}</h1>
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
            Don&apos;t have an account? <a href="/register">Register</a>
          </p>
          <p
            ref={errorRef}
            className={errorMessage ? "error-messagge" : "off-screen"}
            aria-live="assertive"
          >
            {errorMessage}
          </p>
          {loginSuccess && (
            <p className="login-success-message">
              Log in succesfull! Redirecting to home page...
            </p>
          )}
        </form>
      ) : (
        <p>Loading translations...</p>
      )}
    </div>
  );
};

export default Login;
