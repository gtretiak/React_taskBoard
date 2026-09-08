import { useAuthStore } from "../Store/authStore";
import { Navigate, Outlet } from "react-router-dom";

function AuthenticatedRoute() {
  const { accessToken } = useAuthStore();

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}

export default AuthenticatedRoute;
