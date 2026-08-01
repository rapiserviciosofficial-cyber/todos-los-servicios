import { clientQuote, featuredQuote, testimonials } from "../data";
import { IconQuote, IconStar } from "./icons";
import { Reveal } from "./motion";

function Stars({ n = 5, className = "h-3.5 w-3.5" }: { n?: number; className?: string }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n} de 5 estrellas`}>
      {Array.from({ length: n }).map((_, k) => (
        <IconStar key={k} className={`${className} text-gold-500`} />
      ))}
    </span>
  );
}

export default function Voices() {
  return (
    <section id="historias" className="relative overflow-hidden bg-pine-950">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(900px 600px at 15% 10%, rgba(232,159,49,0.10), transparent 55%), radial-gradient(800px 600px at 90% 90%, rgba(62,142,99,0.16), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal dir="left">
            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-jade-300">
                05 · Historias de aquí
              </p>
              <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-paper sm:text-5xl">
                La gente ya no busca fuera.
                <br />
                <span className="text-gold-400">Busca aquí.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal dir="right" delay={100}>
            <p className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-paper/50 md:text-right">
              2,347 reseñas publicadas · promedio 4.9 ★
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* featured story */}
          <Reveal className="lg:col-span-5" dir="left">
            <figure className="group flex h-full flex-col overflow-hidden rounded-xl bg-pine-850 ring-1 ring-gold-400/25 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-pine-950/70 hover:ring-gold-400/60">
              <div className="relative h-64 overflow-hidden sm:h-72">
                <img
                  src={featuredQuote.img}
                  alt={featuredQuote.alt}
                  loading="lazy"
                  className="h-full w-full animate-kenburns object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-950/85 via-pine-950/10 to-transparent" />
                <span className="absolute bottom-4 left-5 rounded-full bg-gold-400 px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-pine-950">
                  Historia destacada
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <IconQuote className="h-8 w-8 text-gold-400" />
                <blockquote className="mt-4 font-display text-[22px] font-semibold leading-snug tracking-tight text-paper">
                  {featuredQuote.quote}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 border-t border-paper/10 pt-5">
                  <Stars />
                  <div>
                    <p className="text-[14.5px] font-bold text-paper">{featuredQuote.name}</p>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-jade-300">
                      {featuredQuote.role}
                    </p>
                  </div>
                </figcaption>
              </div>
            </figure>
          </Reveal>

          {/* scattered postcards */}
          <div className="lg:col-span-7">
            <div className="grid gap-6 sm:grid-cols-2">
              {testimonials.map((t, k) => (
                <Reveal key={t.name} delay={k * 100}>
                  <figure
                    className={`group relative h-full rounded-xl bg-paper p-6 text-ink shadow-xl shadow-pine-950/50 transition-all duration-400 hover:z-10 hover:-translate-y-1.5 hover:rotate-0 hover:shadow-2xl ${t.rotate ?? ""}`}
                  >
                    <span
                      aria-hidden
                      className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-3 rounded-[2px] bg-gold-400/80 shadow-sm"
                    />
                    <Stars />
                    <blockquote className="mt-3.5 text-[15px] leading-relaxed text-ink/80">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3 border-t border-ink/10 pt-4">
                      {t.img ? (
                        <img
                          src={t.img}
                          alt={`Retrato de ${t.name}`}
                          loading="lazy"
                          className="h-11 w-11 rounded-full object-cover ring-2 ring-gold-400/50"
                        />
                      ) : (
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-pine-800 font-display text-sm font-bold text-gold-300">
                          {t.name[0]}
                        </span>
                      )}
                      <div>
                        <p className="text-[14px] font-bold text-pine-800">{t.name}</p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/50">
                          {t.role}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>

            {/* client quote strip */}
            <Reveal delay={160}>
              <figure className="mt-6 flex flex-col gap-4 rounded-xl bg-pine-800/70 p-6 ring-1 ring-paper/10 sm:flex-row sm:items-center">
                <IconQuote className="h-7 w-7 shrink-0 text-jade-300" />
                <blockquote className="text-[15px] leading-relaxed text-paper/85">
                  “{clientQuote.quote}”
                </blockquote>
                <figcaption className="shrink-0 sm:ml-auto sm:text-right">
                  <p className="text-[13.5px] font-bold text-paper">{clientQuote.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/50">
                    {clientQuote.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
