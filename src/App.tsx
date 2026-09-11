import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import NotFoundPage from "./pages/NotFoundPage";
import "../styles/layout.css";
import "../styles/buttons.css";
import "../styles/forms.css";
import "../styles/dialogs.css";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import TaskDetailsPage from "./components/DetailsDialog";
import ChangePasswordPage from "./pages/ChangePasswordPage";

function App() {
  const location = useLocation(); // current URL
  const backgroundLocation = location.state?.backgroundLocation; // saving dashboard to come back later from the task details opened in dialog, without re-rendering it again
  // Toaster is a notification container
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
      <Header />
      <main>
        <Routes location={backgroundLocation || location}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<AuthenticatedRoute />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/password" element={<ChangePasswordPage />} />
            <Route path="/tasks" element={<DashboardPage />} />
            <Route path="tasks/:id" element={<TaskDetailsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {backgroundLocation && (
          <Routes>
            <Route path="/tasks/:id" element={<TaskDetailsPage />} />
          </Routes>
        )}
      </main>
    </>
  );
}
export default App;
// by default the App is provided to other files, otherwise we would need import App from '.App.tsx' everywhere
// JSX component gets returned by App()
// since only one JSX should be returned we wrap everything into one fragment
// Routes is routing decision maker, finds the path and renders the respective element
