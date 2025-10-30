import { useEffect, useRef } from "react";
import { useA11y } from "./accessibilityStore";

/* ---- Utilidades ---- */

function normalize(text: string) {
  return (text || "").replace(/\s+/g, " ").trim();
}

/** divide textos largos para evitar cortes del sintetizador */
function chunk(text: string, size = 230) {
  const parts: string[] = [];
  let t = normalize(text);
  while (t.length > size) {
    let cut = t.lastIndexOf(". ", size);
    if (cut === -1) cut = t.lastIndexOf(" ", size);
    if (cut === -1) cut = size;
    parts.push(t.slice(0, cut + 1).trim());
    t = t.slice(cut + 1).trim();
  }
  if (t) parts.push(t);
  return parts;
}

function speakInPieces(synth: SpeechSynthesis, uFactory: (text: string) => SpeechSynthesisUtterance, text: string) {
  const pieces = chunk(text);
  pieces.forEach((p) => synth.speak(uFactory(p)));
}

/* ---- Hook principal ---- */

export function useTTS() {
  const synth = window.speechSynthesis;
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { ttsEnabled } = useA11y();

  useEffect(() => { if (!ttsEnabled) synth.cancel(); }, [ttsEnabled]);

  const makeUtter = (t: string) => {
    const u = new SpeechSynthesisUtterance(t);
    u.lang = "es-ES";
    u.rate = 1;
    utterRef.current = u;
    return u;
  };

  /** Lee texto plano */
  const speak = (text: string) => {
    if (!ttsEnabled) return;
    const clean = normalize(text);
    if (!clean) return;
    synth.cancel();
    speakInPieces(synth, makeUtter, clean);
  };

  const speakNode = (el: Element | null) => { if (el) speak((el.textContent || "")); };
  const speakSelector = (selector: string) => speakNode(document.querySelector(selector));
  const speakMain = () => speakSelector("#main");

  /** Lee selección o contenedor [data-readable] */
  const speakReadableSelection = () => {
    const sel = window.getSelection?.()?.toString().trim();
    if (sel) return speak(sel);
    let el: HTMLElement | null = (document.activeElement as HTMLElement) || null;
    while (el && !(el as HTMLElement).dataset?.readable) el = el.parentElement;
    if (!el) el = document.querySelector("[data-readable]") as HTMLElement | null;
    speakNode(el);
  };

  /** Resumen enriquecido de TODA la página (header + secciones) */
  const speakFullPage = () => {
    if (!ttsEnabled) return;
    synth.cancel();

    const lines: string[] = [];

    // NAV
    const nav = document.querySelector("header nav");
    if (nav) {
      const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a"))
        .map((a) => normalize(a.textContent || ""))
        .filter(Boolean);
      if (links.length) lines.push(`Navegación superior: ${links.join(", ")}.`);
    }

    // HERO/INTRO
    const main = (document.querySelector("#main") as HTMLElement) || document.body;
    const h1 = main.querySelector("h1") || document.querySelector("h1");
    const pIntro =
      (h1?.nextElementSibling && h1.nextElementSibling.tagName === "P")
        ? h1.nextElementSibling as HTMLElement
        : (main.querySelector("p") as HTMLElement | null);

    if (h1) lines.push(`${normalize(h1.textContent || "")}.`);
    if (pIntro) lines.push(`${normalize(pIntro.textContent || "")}.`);

    const topActions = main.querySelectorAll("a[href], button").length;
    if (topActions) lines.push(`Acciones disponibles en la parte superior: ${topActions}.`);

    const videos = main.querySelectorAll("video").length;
    if (videos) lines.push(`Se muestran ${videos} videos en esta página.`);

    // SECCIONES H2
    const h2s = Array.from(main.querySelectorAll<HTMLHeadingElement>("h2"));
    h2s.forEach((h2) => {
      const section = h2.closest("section") || h2.parentElement || main;
      const title = normalize(h2.textContent || "Sección");

      // heurísticas por tipo
      const imgs = section.querySelectorAll("img").length;
      const articles = section.querySelectorAll("article").length;
      const cards = articles || section.querySelectorAll("[role='article'], .card").length;
      const testimonials = section.querySelectorAll("blockquote,[data-testimonial]").length;

      if (/servicios/i.test(title)) {
        const n = cards || articles || section.querySelectorAll("li, .service, .item").length;
        lines.push(`${title}: ${n ? `${n} servicios destacados.` : "detalles de servicios inclusivos."}`);
      } else if (/galer(i|í)a/i.test(title)) {
        lines.push(`${title}: ${imgs ? `${imgs} imágenes.` : "galería de experiencias."}`);
      } else if (/testimon/i.test(title)) {
        lines.push(`${title}: ${testimonials ? `${testimonials} testimonios.` : "opiniones de visitantes."}`);
      } else {
        // genérico
        const firstP = section.querySelector("p");
        if (firstP) lines.push(`${title}. ${normalize(firstP.textContent || "")}.`);
        else lines.push(title + ".");
      }
    });

    // Cierre si no había h2
    if (!h2s.length) {
      const allText = normalize(main.textContent || "");
      if (allText) lines.push(allText);
    }

    speak(lines.join(" "));
  };

  const cancel = () => synth.cancel();
  const isSpeaking = () => synth.speaking;

  return {
    speak,
    speakNode,
    speakSelector,
    speakMain,
    speakReadableSelection,
    speakFullPage,   // ← NUEVO
    cancel,
    isSpeaking,
  };
}
