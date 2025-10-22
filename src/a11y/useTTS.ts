import { useEffect, useRef } from "react";
import { useA11y } from "./accessibilityStore";

export function useTTS() {
  const synth = window.speechSynthesis;
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { ttsEnabled } = useA11y();

  useEffect(() => { if (!ttsEnabled) synth.cancel(); }, [ttsEnabled]);

  const speak = (text: string) => {
    if (!ttsEnabled) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    utterRef.current = u;
    synth.speak(u);
  };
  const cancel = () => synth.cancel();
  const isSpeaking = () => synth.speaking;

  return { speak, cancel, isSpeaking };
}
