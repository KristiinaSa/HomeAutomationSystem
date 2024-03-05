import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    login,
    errorMessage,
    loginSuccess,
    setErrorMessage,
    setLoginSuccess,
  } = useLogin();

  const emailRef = useRef();
  const errorRef = useRef();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

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
          <p aria-live="assertive">
            Log in succesfull! Redirecting to home page...
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
