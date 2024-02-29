import React from "react";
import { useState, useRef } from "react";
import "./Registration.css";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const errorRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all the fields");
      return;
    }
  };

  {
    return (
      <div>
        <form className="registration-form">
          <h1>Register</h1>
          <label htmlFor="username">Username</label>
          <input
            className="registration-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          >
            Register
          </button>
          <p className="registration-login-router">
            Already have an account? <a href="/login">Log in</a>
          </p>
          <p className="registration-error-message" ref={errorRef}>
            {errorMessage}
          </p>
        </form>
      </div>
    );
  }
};

export default Registration;
