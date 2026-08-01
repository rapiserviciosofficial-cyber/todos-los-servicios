import { useEffect, useMemo, useState, type CSSProperties, type FormEvent } from "react";
import { cn } from "../utils/cn";
import { deckCards, searchChips, tradesMarquee, WA_LINK } from "../data";
import {
  AsterFlower,
  IconArrow,
  IconPin,
  IconSearch,
  IconSeal,
  IconStar,
  IconWhatsapp,
} from "./icons";
import { ScrambleWords } from "./motion";

/* ---------- rotating circular badge ---------- */
function SpinBadge() {
  return (
    <div className="relative h-32 w-32 animate-spin-slow" aria-hidden>
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <defs>
          <path
            id="tl-circle"
            d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
            fill="none"
          />
        </defs>
        <text className="fill-jade-300/90 font-mono text-[9px] uppercase" style={{ letterSpacing: "2.6px" }}>
          <textPath href="#tl-circle">
            Talento local · Las Margaritas · Chiapas ·
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <AsterFlower className="h-8 w-8 text-gold-400" />
      </span>
    </div>
  );
}

/* ---------- topographic backdrop ---------- */
function Contours() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] w-full text-jade-300"
      viewBox="0 0 1440 520"
      preserveAspectRatio="none"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M0 90 C 240 40 480 150 720 105 S 1200 30 1440 95" opacity=".14" />
        <path d="M0 165 C 260 115 500 225 740 180 S 1220 105 1440 170" opacity=".12" />
        <path d="M0 240 C 280 190 520 300 760 255 S 1240 180 1440 245" opacity=".10" />
        <path d="M0 315 C 300 265 540 375 780 330 S 1260 255 1440 320" opacity=".08" />
        <path d="M0 390 C 320 340 560 450 800 405 S 1280 330 1440 395" opacity=".06" />
        <path d="M0 465 C 340 415 580 510 820 470 S 1300 405 1440 470" opacity=".05" />
      </g>
    </svg>
  );
}

/* ---------- cycling deck of local pros ---------- */
function ProDeck() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = deckCards.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 4200);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <div
      className="relative mx-auto w-full max-w-[400px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[470px] sm:h-[480px]">
        {deckCards.map((c, idx) => {
          const rel = (idx - i + n) % n;
          const pos =
            rel === 0
              ? "z-30 translate-x-0 translate-y-0 rotate-0 scale-100 opacity-100"
              : rel === 1
                ? "z-20 translate-x-6 translate-y-5 rotate-[2.5deg] scale-[0.955] opacity-75"
                : rel === 2
                  ? "z-10 translate-x-12 translate-y-10 -rotate-[2deg] scale-[0.91] opacity-40"
                  : "pointer-events-none z-0 translate-x-0 translate-y-6 scale-90 opacity-0";
          return (
            <article
              key={c.name}
              aria-hidden={rel !== 0}
              className={cn(
                "absolute inset-0 overflow-hidden rounded-xl bg-paper text-ink shadow-2xl shadow-pine-950/70 ring-1 ring-paper/20 transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)]",
                pos
              )}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={c.img}
                  alt={c.alt}
                  loading={rel === 0 ? "eager" : "lazy"}
                  className={cn(
                    "h-full w-full object-cover",
                    rel === 0 && "animate-kenburns"
                  )}
                />
                <span className="absolute left-3 top-3 rounded-full bg-pine-950/70 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-gold-300 backdrop-blur-sm">
                  {c.cat}
                </span>
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-jade-100/95 px-3 py-1 text-[11px] font-semibold text-pine-700">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-jade-500" />
                  {c.disp}
                </span>
              </div>
              <div className="flex flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold leading-tight">{c.name}</h3>
                    <p className="mt-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.2em] text-pine-600">
                      {c.oficio}
                    </p>
                  </div>
                  <IconSeal className="h-6 w-6 shrink-0 text-jade-500" />
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-ink/70">
                  <span className="inline-flex items-center gap-1 font-semibold text-ink">
                    <IconStar className="h-3.5 w-3.5 text-gold-500" />
                    {c.rating.toFixed(1)}
                    <span className="font-normal text-ink/50">({c.reviews})</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <IconPin className="h-3.5 w-3.5 text-pine-600" /> {c.colonia}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between border-t border-ink/10 pt-3.5">
                  <p className="font-display text-[22px] font-extrabold leading-none text-pine-800">
                    {c.desde}
                    <span className="ml-1 align-middle font-mono text-[9.5px] font-medium uppercase tracking-widest text-ink/45">
                      desde
                    </span>
                  </p>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={rel === 0 ? 0 : -1}
                    aria-label={`Escribir por WhatsApp a ${c.name}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-pine-800 px-4 py-2 text-[12.5px] font-semibold text-paper transition-all duration-300 hover:bg-pine-700 hover:shadow-md"
                  >
                    <IconWhatsapp className="h-4 w-4 text-jade-300" /> WhatsApp
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* controls */}
      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => setI((v) => (v - 1 + n) % n)}
          aria-label="Ficha anterior"
          className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 text-paper/70 transition-all hover:-translate-x-0.5 hover:border-gold-400/70 hover:text-gold-300"
        >
          <IconArrow className="h-4 w-4 rotate-180" />
        </button>
        <div className="flex items-center gap-2" role="tablist" aria-label="Fichas destacadas">
          {deckCards.map((c, k) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Ver ficha de ${c.name}`}
              aria-current={k === i}
              className={cn(
                "h-2 rounded-full transition-all duration-400",
                k === i ? "w-7 bg-gold-400" : "w-2 bg-paper/25 hover:bg-paper/50"
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setI((v) => (v + 1) % n)}
          aria-label="Siguiente ficha"
          className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 text-paper/70 transition-all hover:translate-x-0.5 hover:border-gold-400/70 hover:text-gold-300"
        >
          <IconArrow className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ---------- hero ---------- */
export default function Hero() {
  const [query, setQuery] = useState("");

  const fireflies = useMemo(
    () =>
      Array.from({ length: 14 }, (_, k) => ({
        left: `${(k * 7.3 + 9) % 96}%`,
        top: `${(k * 13.7 + 6) % 88}%`,
        delay: `${(k * 0.55).toFixed(2)}s`,
        dur: `${5 + (k % 5)}s`,
        size: k % 3 === 0 ? 6 : 4,
      })),
    []
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    document.getElementById("directorio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="relative overflow-hidden bg-pine-950 pb-0 pt-32 sm:pt-36">
      {/* layered ambient background */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1100px 700px at 85% 12%, rgba(232,159,49,0.16), transparent 60%), radial-gradient(900px 650px at 8% 88%, rgba(62,142,99,0.28), transparent 58%), radial-gradient(600px 500px at 55% 55%, rgba(22,59,42,0.9), transparent 70%)",
        }}
      />
      <Contours />
      {fireflies.map((f, k) => (
        <span
          key={k}
          aria-hidden
          className="absolute animate-floaty rounded-full bg-gold-400/60 blur-[1px]"
          style={{
            left: f.left,
            top: f.top,
            width: f.size,
            height: f.size,
            animationDelay: f.delay,
            animationDuration: f.dur,
          }}
        />
      ))}

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* left: message + finder */}
        <div className="lg:col-span-7">
          <p className="mb-6 inline-flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-jade-300">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-gold-400" />
            Directorio vivo · Las Margaritas, Chis.
          </p>

          <h1 className="font-display text-[2.55rem] font-extrabold leading-[1.02] tracking-tight text-paper sm:text-6xl xl:text-[4.5rem]">
            <span className="mask-line" style={{ "--d": "80ms" } as CSSProperties}>
              <span>Todo el talento de</span>
            </span>
            <span className="mask-line" style={{ "--d": "220ms" } as CSSProperties}>
              <span className="relative inline-block text-gold-400">
                Las Margaritas,
                <svg
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[10px] w-full text-gold-500/70"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 9 C 80 3 220 3 297 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
            <span className="mask-line" style={{ "--d": "360ms" } as CSSProperties}>
              <span>en un solo lugar.</span>
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-paper/70">
            Plomeros, carpinteras, electricistas, bordadoras, cafetaleros y más de{" "}
            <strong className="font-semibold text-paper">40 oficios verificados por la propia comunidad</strong>.
            Contrata cerca, paga justo y haz crecer lo nuestro.
          </p>

          {/* finder */}
          <form onSubmit={onSubmit} role="search" className="mt-9 max-w-xl">
            <div className="flex items-center gap-2 rounded-full bg-paper/[0.07] p-2 pl-5 ring-1 ring-paper/15 backdrop-blur-sm transition-shadow duration-300 focus-within:ring-2 focus-within:ring-gold-400/80">
              <IconSearch className="h-5 w-5 shrink-0 text-jade-300" />
              <label htmlFor="busqueda" className="sr-only">
                ¿Qué servicio necesitas hoy?
              </label>
              <input
                id="busqueda"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="¿Qué necesitas hoy? p. ej. plomero"
                className="w-full bg-transparent text-[15px] text-paper placeholder:text-paper/40 focus:outline-none"
              />
              <button
                type="submit"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-400 px-5 py-3 text-sm font-bold text-pine-950 transition-all duration-300 hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-500/30 sm:px-6"
              >
                Buscar
                <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </form>

          <div className="mt-4 flex max-w-xl flex-wrap gap-2">
            {searchChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setQuery(chip.toLowerCase())}
                className="rounded-full border border-paper/15 px-3.5 py-1.5 text-[13px] text-paper/65 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/70 hover:text-gold-300"
              >
                {chip}
              </button>
            ))}
          </div>

          <p className="mt-5 font-mono text-[12px] text-paper/45">
            Hoy el municipio buscó:{" "}
            <ScrambleWords
              words={[
                "plomero",
                "electricista",
                "carpintera",
                "bordadora",
                "mecánico",
                "cafetalero",
                "jardinero",
              ]}
              className="font-semibold text-gold-300"
            />
            <span aria-hidden className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 animate-pulse-dot bg-gold-400/80" />
          </p>

          {/* trust row */}
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-paper/10 pt-7">
            <span className="flex items-center gap-2.5">
              <span className="flex gap-0.5">
                {[0, 1, 2, 3, 4].map((k) => (
                  <IconStar key={k} className="h-4 w-4 text-gold-400" />
                ))}
              </span>
              <span className="text-sm text-paper/70">
                <strong className="font-semibold text-paper">4.9</strong> · 2,347 reseñas reales
              </span>
            </span>
            <span className="hidden h-4 w-px bg-paper/15 sm:block" />
            <span className="inline-flex items-center gap-2 text-sm text-paper/70">
              <IconSeal className="h-5 w-5 text-jade-300" />
              Verificación comunitaria
            </span>
          </div>
        </div>

        {/* right: deck */}
        <div className="relative lg:col-span-5">
          <div className="pointer-events-none absolute -left-16 -top-14 hidden md:block">
            <SpinBadge />
          </div>
          <div className="pointer-events-none absolute -top-5 right-0 z-40 hidden animate-floaty sm:block">
            <span className="rounded-full bg-gold-400 px-4 py-2 text-[12px] font-bold text-pine-950 shadow-xl shadow-pine-950/50">
              4.9 ★ promedio del gremio
            </span>
          </div>
          <div
            className="pointer-events-none absolute -bottom-2 -left-4 z-40 hidden animate-floaty sm:block"
            style={{ animationDelay: "1.4s" }}
          >
            <span className="rounded-full bg-pine-800/90 px-4 py-2 text-[12px] font-semibold text-jade-200 ring-1 ring-jade-400/40 backdrop-blur-sm">
              +348 oficios verificados
            </span>
          </div>
          <ProDeck />
        </div>
      </div>

      {/* trades marquee */}
      <div className="relative mt-16 border-y border-paper/10 bg-pine-900/40 py-5 backdrop-blur-sm sm:mt-20">
        <div className="marquee" aria-label="Oficios disponibles en el directorio">
          <div className="marquee-track items-center gap-8" style={{ "--speed": "36s" } as CSSProperties}>
            {[0, 1].map((half) => (
              <div key={half} aria-hidden={half === 1} className="flex shrink-0 items-center gap-8 pr-8">
                {tradesMarquee.map((t) => (
                  <span key={`${half}-${t}`} className="flex items-center gap-8">
                    <span className="font-display text-xl font-bold uppercase tracking-wide text-paper/35 transition-colors hover:text-gold-300 sm:text-2xl">
                      {t}
                    </span>
                    <AsterFlower className="h-4 w-4 shrink-0 text-gold-500/70" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
