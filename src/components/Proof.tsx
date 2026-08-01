import { partners, stats } from "../data";
import {
  AsterFlower,
  IconChat,
  IconLeaf,
  IconMap,
  IconPeso,
  IconSeal,
  IconShield,
} from "./icons";
import { CountUp, Reveal } from "./motion";

const verifiedRows = [
  { name: "Herrería El Volcán", oficio: "Soldadura y portones", note: "Identidad confirmada" },
  { name: "Doña Chela Costura", oficio: "Composturas y uniformes", note: "2 referencias vecinales" },
  { name: "Transportes Sierra", oficio: "Fletes y mudanzas", note: "41 reseñas reales" },
];

export default function Proof() {
  return (
    <section id="comunidad" className="relative bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        {/* partners */}
        <Reveal>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink/45">
            Con la confianza de
          </p>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
          {partners.map((p, k) => (
            <Reveal key={p} delay={k * 70} className="inline-block">
              <span className="font-display text-lg font-bold tracking-tight text-pine-800/45 transition-colors duration-300 hover:text-pine-800 sm:text-xl">
                {p}
              </span>
            </Reveal>
          ))}
        </div>

        {/* stats */}
        <div className="mt-14 grid grid-cols-2 gap-y-10 border-t border-ink/10 pt-12 lg:grid-cols-4">
          {stats.map((s, k) => (
            <Reveal key={s.label} delay={k * 110}>
              <div className="pr-6">
                <p className="font-display text-[44px] font-extrabold leading-none tracking-tight text-pine-800 sm:text-6xl">
                  <CountUp to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-3 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink/55">
                  <AsterFlower className="h-3 w-3 text-gold-500" />
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* bento features */}
      <div id="ventajas" className="border-t border-ink/10 bg-paper-2/60">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal dir="left">
              <div>
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-pine-600">
                  01 · Por qué funciona
                </p>
                <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-pine-800 sm:text-5xl">
                  Un directorio con palabra.
                </h2>
              </div>
            </Reveal>
            <Reveal dir="right" delay={120}>
              <p className="max-w-md text-[15.5px] leading-relaxed text-ink/65 md:text-right">
                No es un anuncio más en Facebook: es el padrón del talento margariteño,
                cuidado por la gente que lo usa todos los días.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-5 lg:grid-cols-12">
            {/* big: verified */}
            <Reveal className="lg:col-span-7" delay={0}>
              <article className="group flex h-full flex-col rounded-xl border border-ink/10 bg-white/80 p-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-jade-500/50 hover:shadow-xl hover:shadow-pine-800/10 sm:p-8">
                <div className="flex items-center justify-between">
                  <IconShield className="h-8 w-8 text-pine-700 transition-transform duration-400 group-hover:-rotate-6 group-hover:scale-110" />
                  <span className="rounded-full bg-jade-100 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-pine-700">
                    348 fichas activas
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-pine-800">
                  Verificados por la propia comunidad
                </h3>
                <p className="mt-2.5 max-w-lg text-[15px] leading-relaxed text-ink/65">
                  Cada ficha pasa tres filtros: identidad confirmada, referencias de vecinos
                  y reseñas reales de trabajos terminados. Si alguien no cumple, la comunidad
                  lo reporta y lo revisamos el mismo día.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {verifiedRows.map((r) => (
                    <li
                      key={r.name}
                      className="flex items-center gap-3 rounded-lg bg-paper px-4 py-2.5 transition-colors duration-300 hover:bg-jade-100/70"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-pine-800 font-display text-[13px] font-bold text-gold-300">
                        {r.name[0]}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-semibold text-ink">{r.name}</span>
                        <span className="block truncate text-[12px] text-ink/55">{r.oficio}</span>
                      </span>
                      <span className="hidden items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-jade-500 sm:flex">
                        <IconSeal className="h-4 w-4" /> {r.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            {/* precios claros */}
            <Reveal className="lg:col-span-5" delay={120}>
              <article className="group flex h-full flex-col rounded-xl border border-ink/10 bg-white/80 p-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-gold-500/60 hover:shadow-xl hover:shadow-pine-800/10 sm:p-8">
                <IconPeso className="h-8 w-8 text-pine-700 transition-transform duration-400 group-hover:rotate-6 group-hover:scale-110" />
                <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-pine-800">
                  Precios claros desde el inicio
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink/65">
                  Rangos de «desde» publicados en cada ficha y cotización formal por WhatsApp
                  antes de mover una sola herramienta.
                </p>
                <div className="mt-auto pt-6">
                  <div className="flex items-end gap-2 rounded-lg bg-paper px-4 py-3">
                    <span className="font-display text-3xl font-extrabold text-pine-800">$180</span>
                    <span className="pb-1 font-mono text-[10px] uppercase tracking-widest text-ink/45">
                      desde · visita eléctrica
                    </span>
                    <span className="ml-auto rounded-full bg-gold-200 px-2.5 py-1 text-[11px] font-bold text-gold-600">
                      Sin sorpresas
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>

            {/* whatsapp */}
            <Reveal className="lg:col-span-5" delay={0}>
              <article className="group flex h-full flex-col rounded-xl border border-ink/10 bg-white/80 p-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-jade-500/50 hover:shadow-xl hover:shadow-pine-800/10 sm:p-8">
                <IconChat className="h-8 w-8 text-pine-700 transition-transform duration-400 group-hover:-translate-y-1 group-hover:scale-110" />
                <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-pine-800">
                  Agenda directa por WhatsApp
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink/65">
                  Sin apps raras ni call centers: la solicitud llega directo al teléfono del
                  profesional, con fotos y dirección incluidas.
                </p>
                <div className="mt-auto space-y-2 pt-6">
                  <div className="max-w-[85%] rounded-xl rounded-bl-sm bg-pine-800 px-4 py-2.5 text-[13px] text-paper">
                    Buenas tardes, necesito un destape en Col. Centro 🙌
                  </div>
                  <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-jade-100 px-4 py-2.5 text-[13px] text-pine-800">
                    Voy en 40 min. Llevo la máquina. ✓
                  </div>
                </div>
              </article>
            </Reveal>

            {/* cobertura — dark card */}
            <Reveal className="lg:col-span-3" delay={120}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-pine-900 p-7 text-paper ring-1 ring-pine-700 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-pine-950/40">
                <IconMap className="h-8 w-8 text-jade-300" />
                <h3 className="mt-5 font-display text-xl font-bold leading-snug tracking-tight">
                  Cobertura urbana y rural
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-paper/65">
                  Del centro a más de 80 ejidos y rancherías.
                </p>
                <div className="relative mt-auto h-24 pt-4" aria-hidden>
                  <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400" />
                  <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-pulse-dot rounded-full border border-gold-400/60" />
                  {[
                    "18% 22%", "74% 18%", "12% 62%", "82% 58%", "38% 80%", "60% 38%", "26% 40%", "88% 84%",
                  ].map((pos, k) => (
                    <span
                      key={k}
                      className="absolute h-1.5 w-1.5 rounded-full bg-jade-400/80"
                      style={{ left: pos.split(" ")[0], top: pos.split(" ")[1] }}
                    />
                  ))}
                </div>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-jade-300/80">
                  Cabecera + 80 ejidos
                </p>
              </article>
            </Reveal>

            {/* pago */}
            <Reveal className="lg:col-span-4" delay={240}>
              <article className="group flex h-full flex-col rounded-xl border border-ink/10 bg-white/80 p-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-gold-500/60 hover:shadow-xl hover:shadow-pine-800/10">
                <div className="flex items-center justify-between">
                  <IconLeaf className="h-8 w-8 text-pine-700 transition-transform duration-400 group-hover:-rotate-12 group-hover:scale-110" />
                  <span className="font-display text-3xl font-extrabold text-gold-600">0%</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-pine-800">
                  Pagas al terminar, como debe ser
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink/65">
                  Efectivo, transferencia o depósito. El dinero va directo al trabajador:
                  nosotros no tocamos ni un peso.
                </p>
                <p className="mt-auto border-t border-ink/10 pt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
                  $1.2 M movidos al mes en el municipio
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
