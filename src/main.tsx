import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import { ReduxProvider } from "../redux/provider.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Router>
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </Router>
  </StrictMode>
);
