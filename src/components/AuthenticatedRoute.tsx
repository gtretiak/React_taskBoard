import { useAuthStore } from "../Store/authStore";
import { Navigate, Outlet } from "react-router-dom";

function AuthenticatedRoute() {
  const { accessToken } = useAuthStore(); // pulling access token out of a global state

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />; // if token exists - user logged in; outlet is a placeholder ready to transform dynamically in whatever protected route was used
}

export default AuthenticatedRoute;
