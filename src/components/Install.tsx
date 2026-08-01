import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  AsterFlower,
  IconCheck,
  IconDots,
  IconPlus,
  IconShare,
  IconSmartphone,
} from "./icons";
import { Reveal } from "./motion";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export type InstallState = {
  ready: boolean;
  installed: boolean;
  promptInstall: () => Promise<void>;
};

/* ---------- hook: captura el aviso nativo de instalación ---------- */
export function useInstallPrompt(): InstallState {
  const [ready, setReady] = useState(false);
  const [installed, setInstalled] = useState(false);
  const deferredRef = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      deferredRef.current = e as BeforeInstallPromptEvent;
      setReady(true);
    };
    const onInstalled = () => {
      setInstalled(true);
      setReady(false);
      deferredRef.current = null;
    };
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as { standalone?: boolean }).standalone === true;
    if (standalone) setInstalled(true);

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    const deferred = deferredRef.current;
    if (!deferred) return;
    await deferred.prompt();
    const choice = await deferred.userChoice;
    if (choice.outcome === "accepted") {
      setReady(false);
      deferredRef.current = null;
    }
  }, []);

  return { ready, installed, promptInstall };
}

/* ---------- botón flotante de instalación ---------- */
export function InstallPill({ install }: { install: InstallState }) {
  const [dismissed, setDismissed] = useState(false);
  if (!install.ready || install.installed || dismissed) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex animate-pop items-center gap-1 rounded-full bg-gold-400 py-2 pl-4 pr-2 text-pine-950 shadow-2xl shadow-pine-950/60 ring-1 ring-gold-300">
      <button
        type="button"
        onClick={() => void install.promptInstall()}
        className="group flex items-center gap-2.5 text-[14px] font-bold"
      >
        <AsterFlower className="h-5 w-5 animate-spin-slow" />
        Instalar app
        <span className="hidden font-mono text-[9.5px] font-semibold uppercase tracking-widest text-pine-800/70 sm:inline">
          gratis
        </span>
      </button>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Ocultar botón de instalación"
        className="ml-1 grid h-7 w-7 place-items-center rounded-full bg-pine-950/10 transition-colors hover:bg-pine-950/25"
      >
        <IconPlus className="h-3.5 w-3.5 rotate-45" />
      </button>
    </div>
  );
}

/* ---------- pasos por plataforma ---------- */
function Step({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-400/15 font-mono text-[11px] font-bold text-gold-300 ring-1 ring-gold-400/40">
        {n}
      </span>
      <span className="text-[14px] leading-relaxed text-paper/75">{children}</span>
    </li>
  );
}

export function InstallGuide({ install }: { install: InstallState }) {
  return (
    <section id="instalar" className="relative overflow-hidden border-t border-paper/10 bg-pine-900">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(700px 420px at 12% 20%, rgba(232,159,49,0.10), transparent 55%), radial-gradient(600px 420px at 95% 85%, rgba(62,142,99,0.18), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          {/* pitch */}
          <Reveal dir="left" className="lg:col-span-5">
            <p className="inline-flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-jade-300">
              <AsterFlower className="h-3.5 w-3.5 text-gold-400" />
              Llévalo contigo
            </p>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-paper sm:text-[44px]">
              Instálalo como app.
              <br />
              <span className="text-gold-400">Sin tienda, sin registro.</span>
            </h2>
            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-paper/65">
              El directorio vive en tu pantalla de inicio: abre al instante, gasta menos
              datos y funciona aunque la señal esté floja. Como cualquier aplicación,
              pero hecha en Las Margaritas.
            </p>

            <div className="mt-8">
              {install.ready && (
                <button
                  type="button"
                  onClick={() => void install.promptInstall()}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gold-400 px-7 py-3.5 text-[15px] font-bold text-pine-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-300 hover:shadow-xl hover:shadow-gold-500/25"
                >
                  <IconSmartphone className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  Instalar ahora en este equipo
                </button>
              )}
              {install.installed ? (
                <p className="inline-flex items-center gap-2.5 rounded-full bg-jade-500/15 px-5 py-3 text-[14px] font-semibold text-jade-300 ring-1 ring-jade-500/40">
                  <IconCheck className="h-4 w-4" />
                  Ya está instalada en este dispositivo
                </p>
              ) : (
                !install.ready && (
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/45">
                    En Android el aviso aparece solo al abrir el sitio · En iPhone sigue
                    los pasos de Safari →
                  </p>
                )
              )}
              {install.ready && (
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/45">
                  Aparecerá el aviso oficial del navegador
                </p>
              )}
            </div>
          </Reveal>

          {/* platform cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            <Reveal delay={100}>
              <article className="group flex h-full flex-col rounded-xl bg-pine-850 p-7 ring-1 ring-paper/10 transition-all duration-400 hover:-translate-y-1.5 hover:ring-gold-400/50 hover:shadow-2xl hover:shadow-pine-950/50">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-gold-400/15 text-gold-300 ring-1 ring-gold-400/40 transition-transform duration-400 group-hover:scale-110">
                    <IconDots className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-paper/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-paper/70">
                    Android · Chrome
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-paper">
                  En cualquier Android
                </h3>
                <ol className="mt-4 space-y-3.5">
                  <Step n={1}>Abre el sitio en Chrome.</Step>
                  <Step n={2}>
                    Toca el menú{" "}
                    <IconDots className="inline h-4 w-4 translate-y-0.5 text-gold-300" />{" "}
                    arriba a la derecha.
                  </Step>
                  <Step n={3}>
                    Elige <strong className="font-semibold text-gold-300">«Instalar aplicación»</strong>{" "}
                    o «Agregar a pantalla de inicio».
                  </Step>
                </ol>
                <p className="mt-auto border-t border-paper/10 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-jade-300/80">
                  Pesa menos que 3 fotos
                </p>
              </article>
            </Reveal>

            <Reveal delay={220}>
              <article className="group flex h-full flex-col rounded-xl bg-pine-850 p-7 ring-1 ring-paper/10 transition-all duration-400 hover:-translate-y-1.5 hover:ring-gold-400/50 hover:shadow-2xl hover:shadow-pine-950/50">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-gold-400/15 text-gold-300 ring-1 ring-gold-400/40 transition-transform duration-400 group-hover:scale-110">
                    <IconShare className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-paper/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-paper/70">
                    iPhone · Safari
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-paper">
                  En iPhone o iPad
                </h3>
                <ol className="mt-4 space-y-3.5">
                  <Step n={1}>Abre el sitio en Safari.</Step>
                  <Step n={2}>
                    Toca <strong className="font-semibold text-gold-300">Compartir</strong>{" "}
                    <IconShare className="inline h-4 w-4 translate-y-0.5 text-gold-300" />{" "}
                    (el cuadrito con flecha, abajo al centro).
                  </Step>
                  <Step n={3}>
                    Baja y elige <strong className="font-semibold text-gold-300">«Agregar a inicio»</strong>,
                    luego confirma.
                  </Step>
                </ol>
                <p className="mt-auto border-t border-paper/10 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-jade-300/80">
                  Se abre a pantalla completa
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
