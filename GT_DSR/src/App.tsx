import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TasksPage from './pages/TasksPage'
import Header from './components/Header'
import NotFoundPage from './pages/NotFoundPage'
import "../styles/App.css"

function App() {
  return ( 
    <> 
      <Header />
      <main>
        <Routes> 
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </main>
    </>
  );
}
export default App
// by default the App is provided to other files, otherwise we would need import App from '.App.tsx' everywhere
// JSX component gets returned by App()
// since only one JSX should be returned we wrap everything into one fragment
// Routes is routing decision maker, finds the path and renders the respective element