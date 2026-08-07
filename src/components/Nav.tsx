import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { AsterFlower, IconArrow, IconPhone, IconShare } from "./icons";

const links = [
  { href: "#directorio", label: "Directorio" },
  { href: "#ventajas", label: "Ventajas" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#historias", label: "Historias" },
  { href: "#planes", label: "Planes" },
  { href: "#preguntas", label: "Preguntas" },
];

export default function Nav({ onCentral }: { onCentral: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const shareSite = async () => {
    const shareData = {
      title: "Todos los Servicios — Las Margaritas",
      text: "Encuentra servicios y talento local de Las Margaritas, Chiapas.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      window.alert("¡Enlace copiado! Ya puedes compartirlo.");
    } catch {
      // El usuario pudo cancelar el menú nativo de compartir.
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-paper/10 bg-pine-950/85 shadow-lg shadow-pine-950/50 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        {/* Logo */}
        <a href="#inicio" className="group flex items-center gap-3" aria-label="Todos los Servicios — inicio">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-gold-400 text-white-950 transition-transform duration-500 group-hover:rotate-90">
            <AsterFlower className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[17px] font-bold tracking-tight text-paper">
              Todos los Servicios
            </span>
            <span className="mt-1 block font-mono text-[9px] font-medium uppercase tracking-[0.28em] text-jade-300">
              Las Margaritas · Chiapas
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="nav-link text-[13.5px] font-medium text-paper/75 transition-colors hover:text-gold-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={shareSite}
            aria-label="Compartir Todos los Servicios"
            title="Compartir esta página"
            className="hidden items-center gap-2 rounded-full border border-paper/15 px-4 py-2.5 text-[13px] font-semibold text-paper/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/70 hover:text-gold-300 sm:inline-flex"
          >
            <IconShare className="h-4 w-4" />
            Compartir
          </button>
          <button
            type="button"
            onClick={onCentral}
            aria-label="Abrir central de llamadas"
            title="Central de llamadas"
            className="grid h-11 w-11 place-items-center rounded-full border border-paper/15 text-paper/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/70 hover:text-gold-300"
          >
            <IconPhone className="h-5 w-5" />
          </button>
          <a
            href="https://wa.me/529632252742?text=Hola%20quiero%20sumarme%20como%20prestador%20de%20servicios%20en%20Las%20Margaritas"
            className="group hidden items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-white-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-500/25 sm:inline-flex"
          >
           Sumate como prestador de servicios
            <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="relative grid h-11 w-11 place-items-center rounded-full border border-paper/15 text-paper transition-colors hover:border-gold-400/60 lg:hidden"
          >
            <span
              className={cn(
                "absolute h-[2px] w-5 rounded-full bg-current transition-all duration-300",
                open ? "rotate-45" : "-translate-y-[4px]"
              )}
            />
            <span
              className={cn(
                "absolute h-[2px] w-5 rounded-full bg-current transition-all duration-300",
                open ? "-rotate-45" : "translate-y-[4px]"
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        className={cn(
          "grid overflow-hidden border-paper/10 bg-pine-950/95 backdrop-blur-lg transition-all duration-500 lg:hidden",
          open ? "grid-rows-[1fr] border-b opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="space-y-1 px-5 py-6">
            {links.map((l, idx) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-4 py-3 font-display text-xl font-semibold text-paper/90 transition-colors hover:bg-pine-800 hover:text-gold-300"
                >
                  {l.label}
                  <span className="font-mono text-[10px] text-jade-300/70">0{idx + 1}</span>
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href="https://wa.me/529632252742?text=Hola%20quiero%20sumarme%20como%20prestador%20de%20servicios%20en%20Las%20Margaritas"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-gold-400 px-5 py-3.5 font-semibold text-pine-950 transition-colors hover:bg-gold-300"
              >
                Sumate como prestador de servicios <IconArrow className="h-4 w-4" />
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  void shareSite();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-paper/20 px-5 py-3 font-semibold text-paper/80 transition-colors hover:border-gold-400 hover:text-gold-300"
              >
                <IconShare className="h-4 w-4" /> Compartir página
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onCentral();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-paper/20 px-5 py-3 font-semibold text-paper/80 transition-colors hover:border-gold-400 hover:text-gold-300"
              >
                <IconPhone className="h-4 w-4" /> Central de llamadas
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
