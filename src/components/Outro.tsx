import { useState, type CSSProperties, type FormEvent } from "react";
import { CENTRAL_PHONE, WA_LINK } from "../data";
import {
  AsterFlower,
  IconArrow,
  IconFacebook,
  IconInstagram,
  IconMail,
  IconPhone,
  IconPin,
  IconTiktok,
  IconWhatsapp,
} from "./icons";
import { Reveal } from "./motion";

/* ---------- final CTA ---------- */
export function CtaBand() {
  return (
    <section id="unete" className="relative overflow-hidden bg-gradient-to-br from-gold-500 via-gold-400 to-gold-300">
      {/* ambient drifting headline */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-6 select-none opacity-[0.09]">
        <div className="marquee">
          <div className="marquee-track items-center gap-10" style={{ "--speed": "48s" } as CSSProperties}>
            {[0, 1].map((half) => (
              <span key={half} className="flex shrink-0 items-center gap-10 whitespace-nowrap pr-10">
                {Array.from({ length: 4 }).map((_, k) => (
                  <span key={k} className="font-display text-[92px] font-extrabold uppercase leading-none tracking-tight text-white sm:text-[120px]"
                    Súbete al directorio >
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="max-w-3xl">
          <Reveal dir="left">
           <p className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
              <AsterFlower className="h-3.5 w-3.5" /> Convocatoria abierta
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-display text-5xl font-extrabold leading-[1.0] tracking-tight text-white-950 sm:text-6xl xl:text-7xl">
              ¿Tienes un oficio?
              <br />
              Las Margaritas está
              <br />
              por conocerte.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-white/80">
 Sumate como prestador de servicios hoy y empieza a recibir solicitudes...
</p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-pine-950 px-8 py-4 text-[15px] font-bold text-gold-300 shadow-xl shadow-pine-950/30 transition-all duration-300 hover:-translate-y-1 hover:bg-pine-900 hover:shadow-2xl"
              >
                Crear mi ficha gratis
                <IconArrow className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#directorio"
className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-8 py-[14px] text-[15px] font-bold text-white transition-all duration-300 hover:bg-white hover:text-pine-950"              >
                Explorar el directorio
              </a>
            </div>
            <p className="mt-6 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-pine-900/60">
              Sin tarjetas · Sin letras chiquitas · 348 colegas ya están dentro
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
const dirLinks = [
  { label: "Hogar y oficios", href: "#directorio" },
  { label: "Campo", href: "#directorio" },
  { label: "Creativo", href: "#directorio" },
  { label: "Bienestar", href: "#directorio" },
  { label: "Ver todo el padrón", href: "#directorio" },
];

const comLinks = [
  { label: "Historias del gremio", href: "#historias" },
  { label: "Planes y precios", href: "#planes" },
  { label: "Preguntas frecuentes", href: "#preguntas" },
  { label: "Publica tu talento", href: "#unete" },
  { label: "Ventajas del directorio", href: "#ventajas" },
];

export function Footer({ onCentral }: { onCentral: () => void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSent(true);
  };

  return (
    <footer className="relative border-t border-paper/10 bg-pine-950 text-paper">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* brand */}
          <div className="lg:col-span-4">
            <a href="#inicio" className="group inline-flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gold-400 text-pine-950 transition-transform duration-500 group-hover:rotate-90">
                <AsterFlower className="h-5 w-5" />
              </span>
              <span className="leading-none">
                <span className="block font-display text-lg font-bold tracking-tight">Todos los Servicios</span>
                <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.28em] text-jade-300">
                  Las Margaritas · Chiapas
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-paper/60">
              El padrón digital del talento margaritense: para que el trabajo se quede en
              casa y cada peso contratado sostenga a una familia de aquí.
            </p>
            <ul className="mt-6 space-y-3 text-[14px] text-paper/70">
              <li className="flex items-center gap-3">
                <IconPin className="h-4 w-4 shrink-0 text-gold-400" />
                Atención y gestión 100% en línea · 24/7
              </li>
              <li className="flex items-center gap-3">
                <IconWhatsapp className="h-4 w-4 shrink-0 text-jade-300" />
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="transition-colors hover:text-gold-300">
                  {CENTRAL_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <IconMail className="h-4 w-4 shrink-0 text-jade-300" />
                <a href="mailto:hola@todoslosservicios.mx" className="transition-colors hover:text-gold-300">
                  hola@todoslosservicios.mx
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-2.5">
              {[
                { Icon: IconFacebook, label: "Facebook" },
                { Icon: IconInstagram, label: "Instagram" },
                { Icon: IconTiktok, label: "TikTok" },
                { Icon: IconWhatsapp, label: "WhatsApp" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href={label === "WhatsApp" ? WA_LINK : "#inicio"}
                  target={label === "WhatsApp" ? "_blank" : undefined}
                  rel={label === "WhatsApp" ? "noreferrer" : undefined}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-paper/15 text-paper/65 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400 hover:text-gold-300"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* link columns */}
          <div className="lg:col-span-2">
            <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.24em] text-jade-300">
              Directorio
            </p>
            <ul className="mt-5 space-y-3 text-[14px]">
              {dirLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-paper/65 transition-colors hover:text-gold-300">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.24em] text-jade-300">
              Comunidad
            </p>
            <ul className="mt-5 space-y-3 text-[14px]">
              {comLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-paper/65 transition-colors hover:text-gold-300">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* newsletter */}
          <div className="lg:col-span-4">
            <p className="font-display text-2xl font-bold tracking-tight text-paper">
              El Avisador <span className="text-gold-400">semanal</span>
            </p>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-paper/60">
              Cada lunes: oficios nuevos, pedidos grandes y promos del mercado. Cero spam,
              palabra de margaritense.
            </p>
            {sent ? (
              <p className="mt-5 rounded-lg bg-jade-500/15 px-5 py-4 text-[14.5px] font-semibold text-jade-300 ring-1 ring-jade-500/40">
                ¡Listo! Te llegará el próximo lunes a {email}.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="mt-5 flex max-w-md items-center gap-2 rounded-full bg-paper/[0.06] p-1.5 pl-5 ring-1 ring-paper/15 focus-within:ring-gold-400/70">
                <label htmlFor="avisador" className="sr-only">
                  Tu correo electrónico
                </label>
                <input
                  id="avisador"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@ejemplo.mx"
                  className="w-full bg-transparent text-[14px] text-paper placeholder:text-paper/35 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-gold-400 px-5 py-2.5 text-[13.5px] font-bold text-pine-950 transition-all duration-300 hover:bg-gold-300"
                >
                  Suscribirme
                </button>
              </form>
            )}
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/35">
              1,120 vecinos ya lo reciben
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-paper/10 pt-8 sm:flex-row">
          <p className="font-mono text-[11px] text-paper/45">
            © 2026 Todos los Servicios — Hecho con orgullo en Las Margaritas, Chiapas.
          </p>
          <button
            type="button"
            onClick={onCentral}
            className="group inline-flex items-center gap-2 rounded-full border border-paper/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/70 hover:text-gold-300"
          >
            <IconPhone className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-12" />
            Central de llamadas
          </button>
          <p className="flex items-center gap-2 font-mono text-[11px] text-paper/45">
            Arriba el talento local <AsterFlower className="h-3.5 w-3.5 text-gold-400" /> Fotografías: Pexels
          </p>
        </div>
      </div>
    </footer>
  );
}
