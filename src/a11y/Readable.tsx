import { PropsWithChildren } from "react";
import { useTTS } from "./useTTS";

export default function Readable({ children }: PropsWithChildren){
  // Simple wrapper semántico para marcar regiones “leíbles”
  return <div data-readable="true">{children}</div>;
}

/** Botón que lee: si hay texto seleccionado -> esa selección;
 *  si pasas prop target -> busca ese selector;
 *  si no -> lee el contenedor padre más cercano con [data-readable].
 */
export function ReadButton({ target, children }:{ target?: string; children: React.ReactNode }){
  const { speak, cancel } = useTTS();

  const handle = () => {
    const sel = window.getSelection?.()?.toString().trim();
    if (sel) { speak(sel); return; }
    let text = "";
    if (target) {
      const el = document.querySelector(target);
      if (el) text = el.textContent || "";
    } else {
      // Busca el contenedor "Readable" más cercano
      let el: HTMLElement | null = (document.activeElement as HTMLElement) || null;
      while (el && !el.dataset?.readable) el = el.parentElement;
      if (el) text = el.textContent || "";
    }
    if (text) speak(text);
  };

  return (
    <button className="px-3 py-2 rounded bg-gray-200" onClick={handle} onDoubleClick={()=>cancel()}>
      {children}
    </button>
  );
}
