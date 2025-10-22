import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useA11y } from "./accessibilityStore";
import { useTTS } from "./useTTS";
import { useVoiceCommands } from "./useVoiceCommands";
import cn from "classnames";

function SectionHeader({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-6 mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">{children}</h3>;
}

export default function AccessibilityDrawer() {
  const s = useA11y();
  const { speak, cancel } = useTTS();
  useVoiceCommands();

  const Toggle = ({ id, label, desc, value, onChange }:{
    id:string; label:string; desc?:string; value:boolean; onChange:(v:boolean)=>void;
  }) => (
    <div className="flex items-start gap-3 py-2">
      <input id={id} type="checkbox" checked={value} onChange={e=>onChange(e.target.checked)}
        className="mt-1 h-5 w-5" aria-describedby={desc?`${id}-desc`:undefined}/>
      <div>
        <label htmlFor={id} className="font-medium">{label}</label>
        {desc && <p id={`${id}-desc`} className="text-sm text-gray-600">{desc}</p>}
      </div>
    </div>
  );

  const Range = ({ id, label, min, max, step, value, onChange, unit="" }:{
    id:string; label:string; min:number; max:number; step:number; value:number; onChange:(v:number)=>void; unit?:string;
  }) => (
    <div className="py-2">
      <label htmlFor={id} className="block font-medium">{label} <span className="text-gray-500 text-sm">({value}{unit})</span></label>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))}
        className="w-full" />
    </div>
  );

  return (
    <Transition show={s.isDrawerOpen} as={Fragment}>
      <Dialog onClose={s.closeDrawer} className="relative z-50" aria-labelledby="a11y-title">
        <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex justify-end">
          <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-200"
            enterFrom="translate-x-full" enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-150"
            leaveFrom="translate-x-0" leaveTo="translate-x-full">
            <Dialog.Panel className={cn("w-full max-w-md h-full overflow-y-auto bg-white p-6 shadow-xl focus:outline-none")}>
              <Dialog.Title id="a11y-title" className="text-xl font-bold">Accesibilidad</Dialog.Title>
              <p className="text-sm text-gray-600">
                Atajos: Alt+A (abrir/cerrar), Alt+= / Alt+- (texto), Alt+D (oscuro), Alt+R (lector).
              </p>

              {/* Visual */}
              <SectionHeader>Visual</SectionHeader>
              <Toggle id="dark" label="Modo oscuro" value={s.darkMode} onChange={v=>s.set("darkMode", v)} desc="Paleta optimizada para baja luminosidad."/>
              <Toggle id="contrast" label="Alto contraste" value={s.highContrast} onChange={v=>s.set("highContrast", v)} desc="Mayor contraste para mejorar legibilidad."/>
              <Toggle id="underline" label="Resaltar enlaces" value={s.underlineLinks} onChange={v=>s.set("underlineLinks", v)} desc="Subraya todos los enlaces."/>
              <Toggle id="reduce" label="Reducir movimiento" value={s.reduceMotion} onChange={v=>s.set("reduceMotion", v)} desc="Desactiva animaciones y transiciones."/>
              <Range id="textScale" label="Tamaño de texto" min={0.9} max={2} step={0.1} value={s.textScale} onChange={v=>s.set("textScale", v)} />
              <Range id="lineHeight" label="Altura de línea" min={1.2} max={2.2} step={0.1} value={s.lineHeight} onChange={v=>s.set("lineHeight", v)} />
              <Range id="letterSpacing" label="Espaciado de letras (em)" min={-0.02} max={0.1} step={0.01} value={s.letterSpacing} onChange={v=>s.set("letterSpacing", v)} />

              {/* Motriz */}
              <SectionHeader>Motriz</SectionHeader>
              <Toggle id="targets" label="Objetivos grandes (44×44)" value={s.largeTargets} onChange={v=>s.set("largeTargets", v)}/>
              <Toggle id="kbd" label="Navegación por teclado" value={s.keyboardOnlyNav} onChange={v=>s.set("keyboardOnlyNav", v)} desc="Asegura foco visible y orden lógico." />

              {/* Auditiva */}
              <SectionHeader>Auditiva</SectionHeader>
              <Toggle id="captions" label="Subtítulos activados" value={s.captionsEnabled} onChange={v=>s.set("captionsEnabled", v)} />
              <Toggle id="mute" label="Silenciar sonidos automáticos" value={s.muteAll} onChange={v=>s.set("muteAll", v)} />

              {/* Asistivas */}
              <SectionHeader>Asistivas</SectionHeader>
              <Toggle id="tts" label="Lector de texto (TTS)" value={s.ttsEnabled} onChange={v=>s.set("ttsEnabled", v)} desc="Lee en voz alta los contenidos seleccionados." />
              <div className="flex gap-2">
                <button className="px-3 py-2 rounded bg-gray-200" onClick={()=>s.ttsEnabled ? speak("Bienvenido al menú de accesibilidad. Usa Alt A para abrir y cerrar.") : null} disabled={!s.ttsEnabled}>Probar lectura</button>
                <button className="px-3 py-2 rounded bg-gray-200" onClick={cancel} disabled={!s.ttsEnabled}>Detener</button>
              </div>
              <Toggle id="voice" label="Comandos de voz" value={s.voiceCommandsEnabled} onChange={v=>s.set("voiceCommandsEnabled", v)} desc='Ejemplos: "modo oscuro", "aumentar texto", "abrir accesibilidad".' />

              {/* Footer */}
              <div className="mt-6 flex flex-wrap gap-2">
                <button onClick={s.closeDrawer} className="px-4 py-2 rounded bg-black text-white">Cerrar (Esc)</button>
                <button onClick={()=>{
                  s.set("darkMode", false);
                  s.set("highContrast", false);
                  s.set("textScale", 1);
                  s.set("lineHeight", 1.6);
                  s.set("letterSpacing", 0);
                  s.set("underlineLinks", false);
                  s.set("reduceMotion", false);
                  s.set("largeTargets", false);
                  s.set("keyboardOnlyNav", false);
                  s.set("captionsEnabled", true);
                  s.set("muteAll", false);
                  s.set("ttsEnabled", false);
                  s.set("voiceCommandsEnabled", false);
                }} className="px-4 py-2 rounded bg-gray-200">Restablecer</button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
