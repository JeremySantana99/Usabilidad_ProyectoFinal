// React import not required with new JSX transform; keep file clean
import { Link, useNavigate } from "react-router-dom";
import AccessibleForm from "../components/AccessibleForm";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <main className="max-w-6xl mx-auto text-left py-12 px-4">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Centro Turístico EC</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Descubre destinos accesibles, eventos adaptados y servicios inclusivos. Planea tu viaje con herramientas de
          accesibilidad y documentación pensada para cumplimiento de estándares.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link to="/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg">Iniciar sesión</Link>
          <Link to="/register" className="px-6 py-3 bg-green-600 text-white rounded-lg">Registrarme</Link>
        </div>
      </header>

      {/* Featured destinations */}
      <section aria-labelledby="destinos-destacados" className="mt-12">
        <h2 id="destinos-destacados" className="text-2xl font-semibold mb-4">Destinos destacados</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <article className="rounded-lg overflow-hidden border bg-white">
            <img src="/images/mirador.jpg" alt="Mirador accesible con rampa y vista al mar" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">Mirador Costa Azul</h3>
              <p className="text-sm text-gray-600">Rampas de acceso, plataformas con pasamanos y audio-guía disponible.</p>
            </div>
          </article>
          <article className="rounded-lg overflow-hidden border bg-white">
            <img src="/images/museo.jpg" alt="Museo con ascensor y señalética en braille" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">Museo Histórico</h3>
              <p className="text-sm text-gray-600">Ascensores adaptados, itinerarios con audiodescripción y folletos en braille.</p>
            </div>
          </article>
          <article className="rounded-lg overflow-hidden border bg-white">
            <img src="/images/parque.jpg" alt="Parque inclusivo con sendero llano y bancos bajo sombra" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">Parque Central</h3>
              <p className="text-sm text-gray-600">Senderos llanos, áreas sensoriales y baños adaptados.</p>
            </div>
          </article>
        </div>
      </section>

      {/* Itinerarios sugeridos */}
      <section aria-labelledby="itinerarios" className="mt-12">
        <h2 id="itinerarios" className="text-2xl font-semibold mb-4">Itinerarios recomendados</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded bg-white">
            <h4 className="font-semibold">1 día: Ciudad histórica</h4>
            <p className="text-sm text-gray-600">Visita el museo (ascensor), paseo por el mirador y parada en cafeterías con accesos.</p>
          </div>
          <div className="p-4 border rounded bg-white">
            <h4 className="font-semibold">Fin de semana: Costa y relax</h4>
            <p className="text-sm text-gray-600">Ruta costera con pasarelas accesibles, miradores y opciones de transporte adaptado.</p>
          </div>
          <div className="p-4 border rounded bg-white">
            <h4 className="font-semibold">Cultura y teatro (2 días)</h4>
            <p className="text-sm text-gray-600">Teatro con subtítulos y zonas reservadas; rutas con señalética táctil.</p>
          </div>
        </div>
      </section>

      {/* Compromiso de accesibilidad */}
      <section aria-labelledby="compromiso" className="mt-12">
        <h2 id="compromiso" className="text-2xl font-semibold mb-2">Nuestro compromiso</h2>
        <p className="text-gray-700">Centro Turístico EC trabaja para garantizar experiencias accesibles para todas las personas. Publicamos perfiles de accesibilidad por destino con métricas (ancho de puertas, rampas, contraste, subtítulos, interpretación en lengua de señas) y guías de cumplimiento WCAG e ISO 9241.</p>
      </section>

      {/* Newsletter / Contacto rápido (AccessibleForm) */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Suscríbete y mantente informado</h2>
        <AccessibleForm className="mt-4 p-4 border rounded-lg bg-white max-w-2xl">
          <form onSubmit={(e) => { e.preventDefault(); navigate('/register'); }}>
            <label className="block">
              <span className="text-sm">Correo</span>
              <input type="email" required className="mt-1 block w-full rounded border px-3 py-2" aria-label="Correo para newsletter" />
            </label>
            <div className="mt-3 flex gap-2">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded">Suscribirme</button>
              <button type="button" onClick={() => navigate('/register')} className="px-4 py-2 rounded border">Crear cuenta</button>
            </div>
          </form>
        </AccessibleForm>
      </section>

      <section className="mt-12 text-center text-sm text-gray-600">
        <p>¿Necesitas asistencia especial? Usa el botón de accesibilidad (esquina inferior) para ajustar la interfaz y obtener ayuda.</p>
      </section>
    </main>
  );
}
