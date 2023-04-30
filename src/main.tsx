import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { FormStepsProvider } from "./context/FormStepsContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FormStepsProvider>
      <App />
    </FormStepsProvider>
  </React.StrictMode>
);
