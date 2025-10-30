import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import AccessibilityEngine from "./a11y/AccessibilityEngine";
import GlobalMediaController from "./a11y/GlobalMediaController";
import AccessibilityButton from "./a11y/AccessibilityButton";
import AccessibilityDrawer from "./a11y/AccessibilityDrawer";
import TTSNarrator from "./a11y/TTSNarrator";
import Home from "./pages/Home";
import Destinos from "./pages/Destinos";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./stores/auth";

const Gastronomia = React.lazy(() => import("./pages/Gastronomia"));
const Eventos = React.lazy(() => import("./pages/Eventos"));

// wrapper component for protected route (works inside route elements)
function RequireAuth({ children }: Readonly<{ children: any }>) {
  const auth = useAuth();
  if (!auth.user) return <Navigate to="/login" replace />;
  return children;
}

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  {
    path: "/app",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "destinos", element: <Destinos /> },
      { path: "Gastronomia", element: <Gastronomia /> },
      { path: "eventos", element: <Eventos /> }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* motores y UI de accesibilidad disponibles en toda la app (incluye Landing / Login / Register) */}
    <AccessibilityEngine />
    <GlobalMediaController />
    <TTSNarrator />

    <RouterProvider router={router} />

    {/* controles persistentes */}
    <AccessibilityButton />
    <AccessibilityDrawer />
  </React.StrictMode>
);
