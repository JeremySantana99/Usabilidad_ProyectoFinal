import { useEffect } from "react";
import { useA11y } from "./accessibilityStore";

export function useVoiceCommands() {
  const s = useA11y();

  useEffect(() => {
    const w = window as any;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR || !s.voiceCommandsEnabled) return;

    const rec = new SR();
    rec.lang = "es-ES";
    rec.continuous = true;

    rec.onresult = (e: any) => {
      const phrase = e.results[e.results.length - 1][0].transcript.toLowerCase();

      if (phrase.includes("modo oscuro")) s.set("darkMode", true);
      if (phrase.includes("modo claro")) s.set("darkMode", false);
      if (phrase.includes("alto contraste")) s.set("highContrast", true);
      if (phrase.includes("contraste normal")) s.set("highContrast", false);
      if (phrase.includes("aumentar texto")) s.set("textScale", Math.min(2, s.textScale + 0.1));
      if (phrase.includes("disminuir texto")) s.set("textScale", Math.max(0.9, s.textScale - 0.1));
      if (phrase.includes("abrir accesibilidad")) s.openDrawer();
      if (phrase.includes("cerrar accesibilidad")) s.closeDrawer();
    };

    rec.start();
    return () => { try { rec.stop(); } catch {} };
  }, [s.voiceCommandsEnabled, s.darkMode, s.highContrast, s.textScale]);
}
