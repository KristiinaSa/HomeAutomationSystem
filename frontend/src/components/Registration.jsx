import { useState, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Registration.css";
import useRegister from "../hooks/useRegister";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newSystem, setNewSystem] = useState(false);
  const { t } = useLanguage();
  const [timeZone, setTimeZone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const errorRef = useRef();
  const { register, registerSuccess, errorMessage } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(name, email, password, newSystem, timeZone);
  };

  {
    return (
      <div>
        <form className="registration-form">
          <h1>{t("register")}</h1>
          <label htmlFor="username">{t("name")}</label>
          <input
            className="registration-input"
            type="text"
            placeholder={t("name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="username"
            id="username"
            name="username"
            required
          />
          <label htmlFor="email">{t("email")}</label>
          <input
            className="registration-input"
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            id="email"
            name="email"
            required
          />
          <label htmlFor="password">{t("password")}</label>
          <input
            className="registration-input"
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
            className="registration-submit-button"
            type="submit"
            onClick={handleSubmit}
            disabled={registerSuccess}
          >
            {t("register")}
          </button>
          <label htmlFor="newSystem">New System</label>
          <input
            className="registration-input"
            type="checkbox"
            checked={newSystem}
            onChange={(e) => setNewSystem(e.target.checked)}
            id="newSystem"
            name="newSystem"
          />
          <p className="registration-login-router">
            {t("already have an account?")} <a href="/login">{t("login")}</a>
          </p>
          <p className="registration-error-message" ref={errorRef}>
            {errorMessage}
          </p>
          {registerSuccess && (
            <p className="registration-success-message">
              {t("registration successful")}
            </p>
          )}
        </form>
      </div>
    );
  }
};

export default Registration;
