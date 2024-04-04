import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [userId, setUserId] = useState();

  const logout = () => {
    try {
      localStorage.removeItem("access_token");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout, user, setUser, role, setRole, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
