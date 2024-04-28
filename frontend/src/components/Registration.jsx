import { useState, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Registration.css";
import useRegister from "../hooks/useRegister";
import { useParams } from "react-router-dom";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useLanguage();
  const [timeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const isNewSystem = Boolean(!useParams().newSystem);
  const [systemName, setSystemName] = useState("");

  const errorRef = useRef();
  const { register, registerSuccess, errorMessage } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "register",
      name,
      email,
      password,
      isNewSystem,
      timeZone,
      systemName
    );
    register(name, email, password, isNewSystem, timeZone, systemName);
  };

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
        {isNewSystem && (
          <>
            <label htmlFor="systemName">{t("System Name")}</label>
            <input
              className="registration-input"
              type="text"
              placeholder={t("Name your system")}
              value={systemName}
              onChange={(e) => setSystemName(e.target.value)}
              autoComplete="off"
              id="systemName"
              name="systemName"
              required
            />
          </>
        )}
        <button
          className="registration-submit-button"
          type="submit"
          onClick={handleSubmit}
          disabled={registerSuccess}
        >
          {t("register")}
        </button>
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
};

export default Registration;
