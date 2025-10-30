import { Outlet, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../stores/auth";

export default function Layout() {
  return (
    <>
        {/* Header nav */}

  <header className="relative sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-yellow-300 px-3 py-1 rounded"
        >
          Saltar al contenido principal
        </a>

        {/* Logo fijo en la esquina superior izquierda */}
        <div className="absolute left-4 top-3 flex items-center gap-3">
          <img src={logo} alt="Logo Centro Turístico EC" className="h-12 w-auto" />
          <span className="sr-only">Centro Turístico EC</span>
        </div>

        <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between pl-28">
          <div className="flex-1 flex justify-center gap-10 text-lg">
            {[
              ["", "Inicio"],
              ["destinos", "Destinos"],
              ["Gastronomia", "Gastronomía"],
              ["eventos", "Eventos"],
            ].map(([to, label]) => (
              <NavLink
                key={to}
                to={`/app/${to}`}
                className={({ isActive }) =>
                  "px-4 py-4 outline-0 focus-visible:ring-2 focus-visible:ring-blue-500 hover:text-blue-600 transition-colors border-b-2 " +
                  (isActive ? "font-semibold text-blue-700 border-blue-700" : "text-gray-800 border-transparent")
                }
                style={{ textDecoration: 'none' }}
              >
                {label}
              </NavLink>
            ))}
          </div>
          <AuthControls />
        </nav>

      </header>

      <main id="main" className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="mt-16 border-t py-8 text-sm text-gray-600">
        <div className="max-w-6xl mx-auto px-4">
          © 2025 Centro Turistico EC — Contacto del centro turistico:{" "}
          <a
            href="mailto:accesibilidad@turismo.test"
            className="underline"
          >
            CentroTuristico_EC@turismo.test
          </a>
        </div>
      </footer>

      {/* Accessibility controls are rendered at app root so they show before login */}
    </>
  );
}

    function AuthControls() {
      const auth = useAuth();
      if (!auth.user) {
        return (
          <div className="flex gap-2">
            <a href="/login" className="px-3 py-1 rounded border">Iniciar</a>
            <a href="/register" className="px-3 py-1 rounded bg-green-600 text-white">Registro</a>
          </div>
        );
      }

      return (
        <div className="flex items-center gap-3">
          <div className="text-sm">{auth.user.name}</div>
          <button onClick={auth.logout} className="px-3 py-1 rounded border">Cerrar sesión</button>
        </div>
      );
    }
