import { steps, WA_LINK } from "../data";
import { IconArrow, IconWhatsapp } from "./icons";
import { Reveal } from "./motion";

export default function Journey() {
  return (
    <section id="como-funciona" className="relative bg-paper-2 text-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* sticky pitch */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal dir="left">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-pine-600">
                04 · Para el talento
              </p>
              <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-pine-800 sm:text-5xl">
                Tu oficio sostiene al municipio.
                <br />
                <span className="relative inline-block text-gold-600">
                  Nosotros sostenemos
                  <svg
                    aria-hidden
                    className="absolute -bottom-1.5 left-0 h-[8px] w-full text-gold-500/60"
                    viewBox="0 0 300 12"
                    preserveAspectRatio="none"
                  >
                    <path d="M3 9 C 80 3 220 3 297 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>{" "}
                tu agenda.
              </h2>
              <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-ink/65">
                El carpintero, la bordadora, el mecánico: ustedes son la economía de Las
                Margaritas. Este directorio existe para que el trabajo los encuentre,
                no al revés.
              </p>

              <div className="mt-9 flex items-center gap-5 rounded-xl bg-pine-900 p-6 text-paper ring-1 ring-pine-700">
                <p className="font-display text-5xl font-extrabold leading-none text-gold-400 sm:text-6xl">
                  87%
                </p>
                <p className="max-w-[240px] text-[14px] leading-snug text-paper/70">
                  de los clientes vuelve a contratar a la misma ficha que los dejó contentos.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#unete"
                  className="group inline-flex items-center gap-2 rounded-full bg-pine-900 px-7 py-3.5 text-sm font-bold text-gold-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-pine-800 hover:shadow-xl hover:shadow-pine-900/25"
                >
                  Crear mi ficha gratis
                  <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">
                  Plan Semilla: gratis para siempre
                </span>
              </div>

              <div className="mt-10 rounded-xl border border-dashed border-pine-700/40 bg-white/60 p-5">
                <p className="text-[14.5px] text-ink/70">
                  <strong className="font-display text-[15px] font-bold text-pine-800">¿Eres cliente?</strong>{" "}
                  Publica tu solicitud gratis y recibe hasta 3 cotizaciones el mismo día.
                </p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-[13.5px] font-semibold text-pine-700 transition-colors hover:text-gold-600"
                >
                  <IconWhatsapp className="h-4 w-4 text-jade-500" />
                  Publicar una solicitud por WhatsApp
                </a>
              </div>
            </Reveal>
          </div>

          {/* steps */}
          <div className="relative">
            <div aria-hidden className="absolute bottom-6 left-[13px] top-6 w-px bg-gradient-to-b from-gold-500/70 via-pine-700/25 to-transparent" />
            <div className="space-y-6">
              {steps.map((s, k) => (
                <Reveal key={s.n} delay={k * 110}>
                  <article className="group relative rounded-xl border border-ink/10 bg-white p-6 pl-14 shadow-sm transition-all duration-400 hover:-translate-y-1 hover:border-gold-500/60 hover:shadow-xl hover:shadow-pine-900/10 sm:p-7 sm:pl-16">
                    <span
                      aria-hidden
                      className="absolute left-[5px] top-8 grid h-[17px] w-[17px] place-items-center rounded-full border-[3px] border-paper bg-gold-500 transition-transform duration-300 group-hover:scale-125"
                      />
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-600">
                      Paso {s.n}
                    </p>
                    <h3 className="mt-2 font-display text-[22px] font-bold tracking-tight text-pine-800">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-ink/65">{s.desc}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <div className="mt-8 flex items-center gap-4 rounded-xl bg-jade-100 px-6 py-5">
                <span className="font-display text-4xl font-extrabold text-pine-800">5 min</span>
                <p className="text-[14px] leading-snug text-pine-800/75">
                  es todo lo que tarda crear una ficha. El resto del día, tu oficio trabaja
                  por ti.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
