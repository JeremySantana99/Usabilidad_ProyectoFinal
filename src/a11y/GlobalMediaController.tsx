import { useEffect } from "react";
import { useA11y } from "./accessibilityStore";

export default function GlobalMediaController(){
  const { muteAll } = useA11y();

  useEffect(() => {
    const syncMedia = () => {
      const media = document.querySelectorAll<HTMLMediaElement>("audio, video");
      media.forEach(m => {
        m.muted = muteAll;
        if (muteAll && !m.paused) { try { m.pause(); } catch{} }
        // Evitar autoplay
        m.autoplay = false;
      });
    };
    syncMedia();
    const obs = new MutationObserver(syncMedia);
    obs.observe(document.documentElement, { childList:true, subtree:true });
    return () => obs.disconnect();
  }, [muteAll]);

  return null;
}
