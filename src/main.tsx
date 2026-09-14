import { StrictMode } from "react"; //check for depricated functions and accidental side effect
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "../styles/index.css";
import "../styles/theme.css";
import { ThemeProvider } from "./Context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
// With createRoot React takes control of the HTML container (root), where the app lives and with .render it renders inside it React component tree
// with BrowserRouter components can access the browser's URL/navigation system
