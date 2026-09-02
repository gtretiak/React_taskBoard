import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import NotFoundPage from "./pages/NotFoundPage";
import "../styles/App.css";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<AuthenticatedRoute />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/tasks" element={<DashboardPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
export default App;
// by default the App is provided to other files, otherwise we would need import App from '.App.tsx' everywhere
// JSX component gets returned by App()
// since only one JSX should be returned we wrap everything into one fragment
// Routes is routing decision maker, finds the path and renders the respective element
