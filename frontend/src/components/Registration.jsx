import { useState, useRef } from "react";
import "./Registration.css";
import useRegister from "../hooks/useRegister";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const errorRef = useRef();
  const { register, registerSuccess, errorMessage } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(name, email, password);
  };

  {
    return (
      <div>
        <form className="registration-form">
          <h1>Register</h1>
          <label htmlFor="username">Name</label>
          <input
            className="registration-input"
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="username"
            id="username"
            name="username"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            className="registration-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            id="email"
            name="email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            className="registration-input"
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
            className="registration-submit-button"
            type="submit"
            onClick={handleSubmit}
            disabled={registerSuccess}
          >
            Register
          </button>
          <p className="registration-login-router">
            Already have an account? <a href="/login">Log in</a>
          </p>
          <p className="registration-error-message" ref={errorRef}>
            {errorMessage}
          </p>
          {registerSuccess && (
            <p className="registration-success-message">
              Success! Redirecting to log in page...
            </p>
          )}
        </form>
      </div>
    );
  }
};

export default Registration;
