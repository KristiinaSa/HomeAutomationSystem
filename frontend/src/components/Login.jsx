import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import useLogin from "../hooks/useLogin";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, errorMessage, loginSuccess, setErrorMessage } = useLogin();
  const { t } = useLanguage();

  const emailRef = useRef();
  const errorRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, setErrorMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div>
      <form className="login-form">
        <h1>{t("login")}</h1>
        <label htmlFor="email">{t("email")}</label>
        <input
          className="login-input"
          type="email"
          placeholder={t("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          ref={emailRef}
          autoComplete="email"
          id="email"
          name="email"
          required
        />
        <label htmlFor="password">{t("password")}</label>
        <input
          className="login-input"
          type="password"
          placeholder={t("password")}
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
          {t("login")}
        </button>
        <p className="login-register-router">
          {t("don't have an account?")} <a href="/register">{t("register")}</a>
        </p>
        <p
          ref={errorRef}
          className={errorMessage ? "error-messagge" : "off-screen"}
          aria-live="assertive"
        >
          {errorMessage}
        </p>
        {loginSuccess && (
          <p className="login-success-message">{t("login successful")}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
