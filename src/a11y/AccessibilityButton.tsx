import { useA11y } from "./accessibilityStore";

export default function AccessibilityButton() {
  const { openDrawer } = useA11y();

  return (
    <button
      onClick={openDrawer}
      className="fixed bottom-6 right-6 rounded-full bg-black text-white p-4 shadow-lg focus:outline-4"
      aria-label="Abrir menú de accesibilidad (Alt+A)"
      title="Accesibilidad (Alt+A)"
    >
      <span role="img" aria-label="accesibilidad" className="text-2xl">♿</span>
    </button>
  );
}
