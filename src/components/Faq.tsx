import { useState } from "react";
import { cn } from "../utils/cn";
import { CENTRAL_PHONE, faqs, WA_LINK } from "../data";
import { IconPlus, IconWhatsapp } from "./icons";
import { Reveal } from "./motion";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="preguntas" className="relative bg-paper-2 text-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal dir="left" className="lg:sticky lg:top-28">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-pine-600">
                07 · Preguntas frecuentes
              </p>
              <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-pine-800 sm:text-5xl">
                Lo que pregunta el municipio.
              </h2>
              <p className="mt-5 text-[15.5px] leading-relaxed text-ink/65">
                Las dudas que más nos platican en el módulo del mercado, respondidas sin
                letras chiquitas.
              </p>
              <div className="mt-8 rounded-xl bg-pine-900 p-6 text-paper">
                <p className="font-display text-lg font-bold text-gold-300">¿Te quedó una duda?</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-paper/70">
                  Escríbenos y te contestamos en horario de mercado: de 8:00 a 20:00, de
                  martes a domingo.
                </p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-jade-500 px-5 py-2.5 text-[13.5px] font-bold text-pine-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-jade-400"
                >
                  <IconWhatsapp className="h-4 w-4" /> {CENTRAL_PHONE}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-3.5">
              {faqs.map((f, k) => {
                const isOpen = open === k;
                return (
                  <Reveal key={f.q} delay={k * 60}>
                    <div
                      className={cn(
                        "overflow-hidden rounded-xl border bg-white transition-all duration-400",
                        isOpen
                          ? "border-gold-500/60 shadow-lg shadow-pine-900/10"
                          : "border-ink/10 hover:border-pine-700/35"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : k)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${k}`}
                        id={`faq-button-${k}`}
                        className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="hidden font-mono text-[11px] font-semibold text-gold-600 sm:inline">
                            {String(k + 1).padStart(2, "0")}
                          </span>
                          <span className="font-display text-[17px] font-bold tracking-tight text-pine-800 sm:text-lg">
                            {f.q}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-400",
                            isOpen
                              ? "rotate-45 border-gold-500 bg-gold-400 text-pine-950"
                              : "border-ink/15 text-ink/60"
                          )}
                        >
                          <IconPlus className="h-4 w-4" />
                        </span>
                      </button>
                      <div
                        id={`faq-panel-${k}`}
                        role="region"
                        aria-labelledby={`faq-button-${k}`}
                        className={cn(
                          "grid transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)]",
                          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        )}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <p className="border-t border-ink/10 px-6 pb-6 pt-4 text-[15px] leading-relaxed text-ink/70 sm:pl-[60px]">
                            {f.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
