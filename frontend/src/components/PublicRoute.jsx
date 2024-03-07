import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";
export const PublicRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return !isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;
