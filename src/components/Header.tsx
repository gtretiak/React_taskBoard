import "../../styles/Header.css";
import { NavLink, useNavigate } from "react-router-dom";

const isAuthenticated = false; // temporary - to test routing with mock authentication

function Header() {
  const navigate = useNavigate();
  function handleLogout() {
    navigate("/login");
  }

  return (
    <header className="header">
      <div>
        <div>George Targets</div>
        <div>Probably one of the best task boards ever...</div>
      </div>
      {!isAuthenticated ? (
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
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}
export default Header;
