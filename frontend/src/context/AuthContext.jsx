import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem("access_token");
            setIsLoggedIn(false);
          } else {
            setIsLoggedIn(true);
            setUser(decodedToken.name);
            setRole(decodedToken.role);
            setUserId(decodedToken.userId);
          }
        } catch (error) {
          console.error("Error during token verification:", error);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    checkToken();
  }, []);

  const logout = () => {
    try {
      localStorage.removeItem("access_token");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        logout,
        user,
        setUser,
        role,
        setRole,
        userId,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
