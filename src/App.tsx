import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AccessibilityEngine from "./a11y/AccessibilityEngine";
import GlobalMediaController from "./a11y/GlobalMediaController";
import AccessibilityButton from "./a11y/AccessibilityButton";
import AccessibilityDrawer from "./a11y/AccessibilityDrawer";
import TTSNarrator from "./a11y/TTSNarrator";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Destinos from "./pages/Destinos";

// Páginas placeholder (si luego creas archivos, reemplázalas en el router)
function Rutas()   { return <h1 className="text-2xl font-bold">Rutas</h1>; }
function Eventos() { return <h1 className="text-2xl font-bold">Eventos</h1>; }
function Accesible(){ return <h1 className="text-2xl font-bold">Guía de accesibilidad</h1>; }

// Router con tu Layout y páginas
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "destinos", element: <Destinos /> },
        { path: "rutas", element: <Rutas /> },
        { path: "eventos", element: <Eventos /> },
        { path: "accesible", element: <Accesible /> },
      ],
    },
  ],
  // Si después usas hash router o basename, lo ajustas aquí
);

export default function App() {
  return (
    <>
      {/* Aplica preferencias, atajos y políticas de medios a TODA la app */}
      <AccessibilityEngine />
      <GlobalMediaController />
      <TTSNarrator />

      {/* Tu aplicación navegable */}
      <RouterProvider router={router} />

      {/* Botón ♿ flotante + Drawer accesible (persisten entre páginas) */}
      <AccessibilityButton />
      <AccessibilityDrawer />
    </>
  );
}
