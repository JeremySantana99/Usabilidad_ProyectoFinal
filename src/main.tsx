import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

if (import.meta.env.DEV) {
  // Auditoría accesible en dev (opcional)
  // @ts-ignore
  import("react-axe").then(({ default: axe }) => {
    axe(React, ReactDOM, 1000);
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
