import { useState, useEffect, useRef } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const emailRef = useRef();
  const errorRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all the fields");
      return;
    }
  };

  return (
    <div>
      <form className="login-form">
        <h1>Login</h1>
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
        >
          LOG IN
        </button>
        <p
          ref={errorRef}
          className={errorMessage ? "error-messagge" : "off-screen"}
          aria-live="assertive"
        >
          {errorMessage}
        </p>
      </form>
    </div>
  );
};

export default Login;
