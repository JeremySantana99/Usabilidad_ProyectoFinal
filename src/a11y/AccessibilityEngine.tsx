import { useEffect } from "react";
import { useA11y } from "./accessibilityStore";

export default function AccessibilityEngine() {
  const s = useA11y();

  useEffect(() => { s.hydrate(); }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("a11y-dark", s.darkMode);
    html.classList.toggle("a11y-contrast", s.highContrast);
    html.classList.toggle("a11y-underline", s.underlineLinks);
    html.classList.toggle("a11y-large-targets", s.largeTargets);
    html.classList.toggle("a11y-reduce-motion", s.reduceMotion);

    html.style.setProperty("--text-size", `${s.textScale}rem`);
    html.style.setProperty("--line-height", String(s.lineHeight));
    html.style.setProperty("--letter-spacing", `${s.letterSpacing}em`);
  }, [
    s.darkMode, s.highContrast, s.underlineLinks, s.largeTargets, s.reduceMotion,
    s.textScale, s.lineHeight, s.letterSpacing
  ]);

  // Atajos globales
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isAlt = e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey;
      if (!isAlt) return;
      const k = e.key.toUpperCase();

      if (k === "A") { e.preventDefault(); s.set("isDrawerOpen", !s.isDrawerOpen); }
      if (k === "=") { e.preventDefault(); s.set("textScale", Math.min(2, Number((s.textScale + 0.1).toFixed(2)))); }
      if (k === "-") { e.preventDefault(); s.set("textScale", Math.max(0.9, Number((s.textScale - 0.1).toFixed(2)))); }
      if (k === "D") { e.preventDefault(); s.toggle("darkMode"); }
      if (k === "R") { e.preventDefault(); s.toggle("ttsEnabled"); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [s]);

  return null;
}
