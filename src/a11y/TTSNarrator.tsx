// src/a11y/TTSNarrator.tsx
import { useEffect } from "react";
import { useA11y } from "./accessibilityStore";
import { useTTS } from "./useTTS";

export default function TTSNarrator() {
  const { ttsEnabled, keyboardOnlyNav } = useA11y();
  const { speak, speakFullPage, cancel } = useTTS();

  // Leer resumen al activar TTS y en cambios de ruta/hash
  useEffect(() => {
    if (!ttsEnabled) {
      cancel();
      return;
    }
    
    // Pequeño retraso para evitar ciclos
    const timer = setTimeout(() => {
      speakFullPage();
    }, 100);

    const onHash = () => {
      if (ttsEnabled) {
        setTimeout(speakFullPage, 100);
      }
    };

    globalThis.addEventListener("hashchange", onHash);
    globalThis.addEventListener("popstate", onHash);
    
    return () => {
      clearTimeout(timer);
      globalThis.removeEventListener("hashchange", onHash);
      globalThis.removeEventListener("popstate", onHash);
      cancel();
    };
  }, [ttsEnabled, speakFullPage, cancel]);

  // Anunciar foco (si el usuario usa navegación por teclado o el TTS está activo)
  useEffect(() => {
    if (!ttsEnabled) return;

    const interest = new Set(["A","BUTTON","INPUT","SELECT","TEXTAREA","SUMMARY"]);
    const onFocus = (e: FocusEvent) => {
      const t = e.target as HTMLElement;
      if (!t) return;
      // Solo si es control típicamente interactivo
      if (interest.has(t.tagName) || t.getAttribute("role") === "button" || t.getAttribute("role") === "link") {
        // evita leer textos larguísimos de dentro
        const label = t.getAttribute("aria-label")
          || (t as HTMLInputElement).placeholder
          || (t.textContent || "").trim().slice(0, 120);
        const kind = t.getAttribute("role") || t.tagName.toLowerCase();
        if (label) speak(`${label}. ${kind}.`);
        else speak(`${kind}.`);
      }
    };

    // Activamos cuando el usuario marca "Navegación por teclado" o de todos modos si TTS está activo
    if (keyboardOnlyNav || ttsEnabled) {
      globalThis.addEventListener("focusin", onFocus);
      return () => globalThis.removeEventListener("focusin", onFocus);
    }
  }, [ttsEnabled, keyboardOnlyNav, speak]);

  // Cancelar al cerrar la pestaña o recargar
  useEffect(() => {
    const onBefore = () => cancel();
    globalThis.addEventListener("beforeunload", onBefore);
    return () => globalThis.removeEventListener("beforeunload", onBefore);
  }, [cancel]);

  return null;
}
