import { create } from "zustand";

export type Shortcuts = {
  openMenu: string;      // Alt+A
  increaseText: string;  // Alt+=
  decreaseText: string;  // Alt+-
  toggleDark: string;    // Alt+D
  ttsRead: string;       // Alt+R
};

export type AccessibilityState = {
  // Visual
  darkMode: boolean;
  highContrast: boolean;
  textScale: number;     // 0.9..2.0
  lineHeight: number;    // 1.2..2.2
  letterSpacing: number; // -0.02..0.1 (em)
  underlineLinks: boolean;
  reduceMotion: boolean;
  // Motriz
  largeTargets: boolean;
  keyboardOnlyNav: boolean;
  // Auditiva
  captionsEnabled: boolean;
  muteAll: boolean;
  // Asistivas
  ttsEnabled: boolean;
  voiceCommandsEnabled: boolean;

  // UI
  isDrawerOpen: boolean;
  shortcuts: Shortcuts;

  // actions
  toggle: (key: keyof AccessibilityState) => void;
  set: <K extends keyof AccessibilityState>(k: K, v: AccessibilityState[K]) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  hydrate: () => void;
};

const STORAGE_KEY = "a11y_prefs_v1";

const defaults: Omit<
  AccessibilityState,
  "toggle" | "set" | "openDrawer" | "closeDrawer" | "hydrate"
> = {
  darkMode: false,
  highContrast: false,
  textScale: 1,
  lineHeight: 1.6,
  letterSpacing: 0,
  underlineLinks: false,
  reduceMotion: false,
  largeTargets: false,
  keyboardOnlyNav: false,
  captionsEnabled: true,
  muteAll: false,
  ttsEnabled: false,
  voiceCommandsEnabled: false,
  isDrawerOpen: false,
  shortcuts: {
    openMenu: "Alt+A",
    increaseText: "Alt+=",
    decreaseText: "Alt+-",
    toggleDark: "Alt+D",
    ttsRead: "Alt+R",
  },
};

export const useA11y = create<AccessibilityState>((set, get) => ({
  ...defaults,
  toggle: (key) => {
    // Si estamos desactivando el TTS, asegurarse de cancelar cualquier síntesis de voz
    if (key === 'ttsEnabled' && get().ttsEnabled) {
      globalThis.speechSynthesis?.cancel();
    }
    set({ [key]: !get()[key] } as any);
  },
  set: (k, v) => set({ [k]: v } as any),
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  hydrate: () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) { localStorage.setItem(STORAGE_KEY, JSON.stringify(get())); return; }
    try { set({ ...get(), ...JSON.parse(raw) }); } catch {}
  },
}));

// Persistencia automática
useA11y.subscribe((state) => {
  const { toggle, set, openDrawer, closeDrawer, hydrate, ...persist } = state as any;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
});
