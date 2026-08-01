import { useState } from "react";
import { cn } from "../utils/cn";
import { plans, WA_LINK } from "../data";
import { IconArrow, IconCheck, IconShield, IconStar } from "./icons";
import { Reveal } from "./motion";

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="planes" className="relative bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal dir="left">
            <div className="max-w-xl">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-pine-600">
                06 · Planes para tu oficio
              </p>
              <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-pine-800 sm:text-5xl">
                Empieza gratis.
                <br />
                Crece cuando quieras.
              </h2>
              <p className="mt-5 text-[15.5px] leading-relaxed text-ink/65">
                Nunca cobramos comisión por el trabajo que consigues. Los planes solo
                amplifican tu ficha dentro del directorio.
              </p>
            </div>
          </Reveal>

          <Reveal dir="right" delay={100}>
            <div
              className="inline-flex items-center rounded-full bg-pine-900/5 p-1.5 ring-1 ring-pine-900/10"
              role="group"
              aria-label="Periodo de facturación"
            >
              <button
                type="button"
                onClick={() => setYearly(false)}
                aria-pressed={!yearly}
                className={cn(
                  "rounded-full px-5 py-2.5 text-[13.5px] font-semibold transition-all duration-300",
                  !yearly ? "bg-pine-900 text-paper shadow-md" : "text-ink/55 hover:text-pine-800"
                )}
              >
                Mensual
              </button>
              <button
                type="button"
                onClick={() => setYearly(true)}
                aria-pressed={yearly}
                className={cn(
                  "rounded-full px-5 py-2.5 text-[13.5px] font-semibold transition-all duration-300",
                  yearly ? "bg-pine-900 text-gold-300 shadow-md" : "text-ink/55 hover:text-pine-800"
                )}
              >
                Anual <span className="ml-1 font-mono text-[10px] text-gold-600">2 meses gratis</span>
              </button>
            </div>
          </Reveal>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((p, k) => {
            const price = yearly ? p.yearly : p.monthly;
            return (
              <Reveal key={p.name} delay={k * 120} className="h-full">
                <article
                  className={cn(
                    "relative flex h-full flex-col rounded-xl p-8 transition-all duration-400",
                    p.featured
                      ? "bg-pine-900 text-paper shadow-2xl shadow-pine-900/40 ring-2 ring-gold-400 hover:-translate-y-2 lg:scale-[1.04]"
                      : "border border-ink/10 bg-white hover:-translate-y-2 hover:border-pine-700/40 hover:shadow-xl hover:shadow-pine-900/10"
                  )}
                >
                  {p.badge && (
                    <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gold-400 px-4 py-1.5 text-[11.5px] font-bold text-pine-950 shadow-lg shadow-gold-500/30">
                      <IconStar className="h-3 w-3" /> {p.badge}
                    </span>
                  )}

                  <div className="flex items-baseline justify-between">
                    <h3
                      className={cn(
                        "font-display text-2xl font-extrabold tracking-tight",
                        p.featured ? "text-gold-300" : "text-pine-800"
                      )}
                    >
                      {p.name}
                    </h3>
                    <span
                      className={cn(
                        "font-mono text-[10px] uppercase tracking-[0.18em]",
                        p.featured ? "text-jade-300" : "text-ink/45"
                      )}
                    >
                      {p.tagline}
                    </span>
                  </div>

                  <div className="mt-6 flex items-end gap-2" key={`${p.name}-${yearly}`}>
                    <span
                      className={cn(
                        "animate-pop font-display text-[52px] font-extrabold leading-none tracking-tight",
                        p.featured ? "text-paper" : "text-pine-800"
                      )}
                    >
                      {price === 0 ? "Gratis" : `$${price}`}
                    </span>
                    {price > 0 && (
                      <span
                        className={cn(
                          "pb-2 font-mono text-[10.5px] uppercase tracking-widest",
                          p.featured ? "text-paper/50" : "text-ink/45"
                        )}
                      >
                        /mes{yearly && " · facturado anual"}
                      </span>
                    )}
                  </div>
                  {price > 0 && yearly && (
                    <p className={cn("mt-1.5 text-[12px]", p.featured ? "text-jade-300/90" : "text-gold-600")}>
                      Ahorras ${(p.monthly - p.yearly) * 12} MXN al año
                    </p>
                  )}

                  <ul className="mt-7 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span
                          className={cn(
                            "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                            p.featured ? "bg-gold-400/15 text-gold-300" : "bg-jade-100 text-jade-500"
                          )}
                        >
                          <IconCheck className="h-3 w-3" />
                        </span>
                        <span
                          className={cn(
                            "text-[14px] leading-snug",
                            p.featured ? "text-paper/80" : "text-ink/70"
                          )}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <a
                      href={p.name === "Maestro" ? WA_LINK : "#unete"}
                      target={p.name === "Maestro" ? "_blank" : undefined}
                      rel={p.name === "Maestro" ? "noreferrer" : undefined}
                      className={cn(
                        "group flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-all duration-300",
                        p.featured
                          ? "bg-gold-400 text-pine-950 hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-500/30"
                          : "border-2 border-pine-800 text-pine-800 hover:bg-pine-800 hover:text-gold-300"
                      )}
                    >
                      {p.cta}
                      <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={140}>
          <p className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">
            <IconShield className="h-4 w-4 text-jade-500" />
            Sin comisiones por trabajo conseguido · Cancela cuando quieras · Precios en MXN
          </p>
        </Reveal>
      </div>
    </section>
  );
}
