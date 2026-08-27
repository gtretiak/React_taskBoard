import "../../styles/Header.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../CustomHooks/useAuth";

function Header() {
  const { accessToken, logout } = useAuth();

  return (
    <header className="header">
      <div>
        <div>George Targets</div>
        <div>Probably one of the best task boards ever...</div>
      </div>
      {!accessToken ? (
        <nav className="nav">
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Register
          </NavLink>
        </nav>
      ) : (
        <nav className="nav">
          <NavLink
            to="/tasks"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Tasks
          </NavLink>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}
export default Header;
