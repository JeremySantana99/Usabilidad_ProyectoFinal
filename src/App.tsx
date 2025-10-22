import AccessibilityEngine from "./a11y/AccessibilityEngine";
import AccessibilityButton from "./a11y/AccessibilityButton";
import AccessibilityDrawer from "./a11y/AccessibilityDrawer";
import Header from "./components/Header";
import Card from "./components/Card";
import { demoPlaces } from "./data/demo";

export default function App() {
  return (
    <>
      <AccessibilityEngine />

      <Header />

      <main id="main" className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold">Bienvenido</h1>
        <p>
          Usa el botón <span aria-label="símbolo de accesibilidad" role="img">♿</span> o el atajo <kbd>Alt</kbd>+<kbd>A</kbd> para abrir el menú.
          Prueba a aumentar el texto (<kbd>Alt</kbd>+<kbd>=</kbd>), activar modo oscuro (<kbd>Alt</kbd>+<kbd>D</kbd>) o el lector (<kbd>Alt</kbd>+<kbd>R</kbd>).
        </p>

        <section aria-labelledby="lugares">
          <h2 id="lugares" className="text-xl font-semibold mb-2">Lugares destacados</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {demoPlaces.map(p => <Card key={p.title} {...p} />)}
          </div>
        </section>

        <section aria-labelledby="accesibilidad-info">
          <h2 id="accesibilidad-info" className="text-xl font-semibold mt-8 mb-2">Accesibilidad del sitio</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Opciones para usuarios con discapacidad auditiva, visual y motriz (según plantilla y WCAG 2.2). :contentReference[oaicite:1]&#123;index=1&#125;</li>
            <li>Controles de contraste, tamaño de texto, espaciados y reducción de movimiento.</li>
            <li>Lector de texto (TTS) y comandos de voz básicos.</li>
            <li>Objetivos táctiles grandes, enlaces resaltados y navegación por teclado.</li>
          </ul>
        </section>
      </main>

      <AccessibilityButton />
      <AccessibilityDrawer />
    </>
  );
}
