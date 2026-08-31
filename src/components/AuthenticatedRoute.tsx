import { useAuth } from "../CustomHooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

function AuthenticatedRoute() {
  const { accessToken } = useAuth();

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}

export default AuthenticatedRoute;
