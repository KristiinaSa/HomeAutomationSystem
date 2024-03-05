import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );

  const logout = () => {
    try {
      localStorage.removeItem("access_token");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
