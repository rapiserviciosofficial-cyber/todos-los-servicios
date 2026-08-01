import { useState } from "react";
import { cn } from "../utils/cn";
import { categories, services, WA_LINK } from "../data";
import { IconArrow, IconPin, IconSeal, IconStar, IconWhatsapp } from "./icons";
import { Reveal } from "./motion";

export default function Showcase() {
  const [cat, setCat] = useState("todos");
  const list = cat === "todos" ? services : services.filter((s) => s.cat === cat);

  return (
    <section id="directorio" className="relative overflow-hidden bg-pine-900">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(800px 500px at 90% 0%, rgba(232,159,49,0.10), transparent 55%), radial-gradient(700px 500px at 0% 100%, rgba(62,142,99,0.20), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal dir="left">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-jade-300">
                02 · El directorio
              </p>
              <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-paper sm:text-5xl">
                Manos que resuelven,
                <br />
                <span className="text-gold-400">a unas calles de ti.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal dir="right" delay={100}>
            <p className="max-w-sm text-[15.5px] leading-relaxed text-paper/60 lg:text-right">
              Una muestra de las fichas publicadas esta semana. Cada una con precios,
              colonia y reseñas de vecinos reales.
            </p>
          </Reveal>
        </div>

        {/* tabs */}
        <Reveal delay={80}>
          <div className="mb-10 flex flex-wrap gap-2.5" role="tablist" aria-label="Categorías del directorio">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={cat === c.id}
                onClick={() => setCat(c.id)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-[13.5px] font-semibold transition-all duration-300",
                  cat === c.id
                    ? "bg-gold-400 text-pine-950 shadow-lg shadow-gold-500/20"
                    : "text-paper/65 ring-1 ring-paper/15 hover:-translate-y-0.5 hover:text-gold-300 hover:ring-gold-400/50"
                )}
              >
                {c.label}
                <span
                  className={cn(
                    "ml-2 font-mono text-[10px]",
                    cat === c.id ? "text-pine-800" : "text-paper/40"
                  )}
                >
                  {c.id === "todos" ? services.length : services.filter((s) => s.cat === c.id).length}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* grid */}
        <div key={cat} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, idx) => (
            <Reveal key={s.id} delay={(idx % 3) * 90}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-pine-800 ring-1 ring-paper/10 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-pine-950/60 hover:ring-gold-400/50">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pine-950/70 via-transparent to-transparent" />
                  <span className="absolute left-3.5 top-3.5 rounded-full bg-pine-950/70 px-3 py-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.18em] text-gold-300 backdrop-blur-sm">
                    {categories.find((c) => c.id === s.cat)?.label}
                  </span>
                  <span className="absolute right-3.5 top-3.5 rounded-full bg-jade-100/95 px-3 py-1 text-[11px] font-semibold text-pine-700">
                    {s.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-bold leading-tight text-paper transition-colors group-hover:text-gold-300">
                        {s.provider}
                      </h3>
                      <p className="mt-1 text-[13.5px] text-paper/55">{s.oficio}</p>
                    </div>
                    <IconSeal className="h-6 w-6 shrink-0 text-jade-400" />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-paper/60">
                    <span className="inline-flex items-center gap-1 font-semibold text-paper">
                      <IconStar className="h-3.5 w-3.5 text-gold-400" />
                      {s.rating.toFixed(1)}
                      <span className="font-normal text-paper/45">({s.reviews})</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <IconPin className="h-3.5 w-3.5 text-jade-300" /> {s.colonia}
                    </span>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-paper/10 pt-4">
                    <p className="font-display text-xl font-extrabold text-gold-300">
                      ${s.desde}
                      <span className="ml-1.5 align-middle font-mono text-[9.5px] font-medium uppercase tracking-widest text-paper/40">
                        desde
                      </span>
                    </p>
                    <div className="flex items-center gap-2">
                      <a
                        href={WA_LINK}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Escribir por WhatsApp a ${s.provider}`}
                        className="grid h-9 w-9 place-items-center rounded-full text-jade-300 ring-1 ring-paper/15 transition-all duration-300 hover:scale-110 hover:bg-jade-500 hover:text-pine-950 hover:ring-jade-500"
                      >
                        <IconWhatsapp className="h-4 w-4" />
                      </a>
                      <a
                        href={WA_LINK}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Ver ficha de ${s.provider}`}
                        className="grid h-9 w-9 place-items-center rounded-full text-paper/70 ring-1 ring-paper/15 transition-all duration-300 group-hover:bg-gold-400 group-hover:text-pine-950 group-hover:ring-gold-400"
                      >
                        <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-xl border border-dashed border-paper/20 bg-pine-850/60 px-7 py-6 sm:flex-row">
            <p className="text-center text-[15px] text-paper/70 sm:text-left">
              ¿No encuentras lo que buscas? Hay{" "}
              <strong className="font-semibold text-gold-300">348 fichas publicadas</strong> y
              subiendo cada semana.
            </p>
            <a
              href="#solicitar"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-gold-400/60 px-6 py-3 text-sm font-semibold text-gold-300 transition-all duration-300 hover:bg-gold-400 hover:text-pine-950"
            >
              Pedir un oficio específico
              <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
