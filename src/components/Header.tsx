import "../../styles/Header.css";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../Store/authStore";

function Header() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.logout);
  // extracting the entire state would cause unnecessary re-rendering on every change to any unrelated state (like nickname, role, etc.)

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
          <NavLink
            to="/password"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Change password
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
// by tracking current URL and using isActive property, NavLink can say whether it's active or not, so that we can dynamically change the CSS class
