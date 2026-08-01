import { useState, type FormEvent } from "react";
import { cn } from "../utils/cn";
import { CENTRAL_PHONE, CENTRAL_WA } from "../data";
import {
  AsterFlower,
  IconArrow,
  IconCheck,
  IconClock,
  IconPhone,
  IconPin,
  IconWhatsapp,
} from "./icons";
import { Reveal } from "./motion";

const OFICIOS_REQ = [
  "Plomería",
  "Electricidad",
  "Carpintería",
  "Herrería",
  "Mecánica",
  "Albañilería",
  "Jardinería",
  "Belleza / estilista",
  "Bordados / textiles",
  "Café / campo",
  "Panadería / comida",
  "Aún no sé — oriéntenme",
];

const URGENCIAS = ["Hoy mismo", "Esta semana", "Solo cotizar"];

const pasos = [
  {
    n: "1",
    t: "Recibimos tu solicitud",
    d: "Llega directo al WhatsApp de la central, con todos tus datos ordenados. Sin esperas ni menús.",
  },
  {
    n: "2",
    t: "Te llamamos en menos de 1 hora",
    d: "En horario de mercado: de martes a domingo, 8:00–20:00. Si es urgencia, marcamos de inmediato.",
  },
  {
    n: "3",
    t: "Te conectamos con el indicado",
    d: "Un oficio verificado por la comunidad, con precio claro y de tu propia colonia o ejido.",
  },
];

const field =
  "w-full rounded-lg border border-paper/15 bg-pine-800 px-4 py-3 text-[15px] text-paper placeholder:text-paper/35 transition-all duration-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30";
const label = "mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-jade-300";

export default function RequestForm() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [oficio, setOficio] = useState(OFICIOS_REQ[0]);
  const [colonia, setColonia] = useState("");
  const [detalle, setDetalle] = useState("");
  const [urgencia, setUrgencia] = useState(URGENCIAS[0]);
  const [error, setError] = useState("");
  const [lastUrl, setLastUrl] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim()) {
      setError("Necesitamos tu nombre y un teléfono para devolverte la llamada.");
      return;
    }
    setError("");
    const msg = [
      "📋 *SOLICITUD DE SERVICIO* · todoslosservicios",
      `👤 Nombre: ${nombre.trim()}`,
      `📞 Teléfono: ${telefono.trim()}`,
      `🛠️ Necesito: ${oficio}`,
      `📍 Colonia/ejido: ${colonia.trim() || "No especificada"}`,
      `⏰ Urgencia: ${urgencia}`,
      `📝 Detalle: ${detalle.trim() || "—"}`,
    ].join("\n");
    const url = `https://wa.me/${CENTRAL_WA}?text=${encodeURIComponent(msg)}`;
    setLastUrl(url);
    window.location.href = url;
  };

  const reset = () => {
    setNombre("");
    setTelefono("");
    setOficio(OFICIOS_REQ[0]);
    setColonia("");
    setDetalle("");
    setUrgencia(URGENCIAS[0]);
    setError("");
  };

  return (
    <section id="solicitar" className="relative overflow-hidden bg-paper text-ink">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(700px 400px at 100% 0%, rgba(62,142,99,0.12), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* pitch + pasos */}
          <div className="lg:col-span-5">
            <Reveal dir="left">
              <p className="inline-flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-pine-600">
                <AsterFlower className="h-3.5 w-3.5 text-gold-500" />
                03 · Solicita un servicio
              </p>
              <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-pine-800 sm:text-5xl">
                ¿No sabes a quién llamar?
                <br />
                <span className="relative inline-block text-gold-600">
                  Cuéntanos y te conectamos.
                  <svg
                    aria-hidden
                    className="absolute -bottom-1.5 left-0 h-[8px] w-full text-gold-500/60"
                    viewBox="0 0 300 12"
                    preserveAspectRatio="none"
                  >
                    <path d="M3 9 C 80 3 220 3 297 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
              <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-ink/65">
                La central recibe tu solicitud, te devuelve la llamada y te pasa con el
                oficio correcto. Tú solo describes el problema.
              </p>
            </Reveal>

            <div className="mt-9 space-y-5">
              {pasos.map((p, k) => (
                <Reveal key={p.n} delay={k * 110}>
                  <div className="group flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-pine-900 font-display text-[15px] font-bold text-gold-300 transition-transform duration-300 group-hover:scale-110">
                      {p.n}
                    </span>
                    <div>
                      <h3 className="font-display text-[17px] font-bold tracking-tight text-pine-800">
                        {p.t}
                      </h3>
                      <p className="mt-1 text-[14px] leading-relaxed text-ink/60">{p.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={300}>
              <div className="mt-9 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-jade-100 px-3.5 py-1.5 text-[12px] font-semibold text-pine-700">
                  <IconCheck className="h-3.5 w-3.5" /> Atendido por personas, no por bots
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-jade-100 px-3.5 py-1.5 text-[12px] font-semibold text-pine-700">
                  <IconClock className="h-3.5 w-3.5" /> Respuesta en menos de 1 h
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-jade-100 px-3.5 py-1.5 text-[12px] font-semibold text-pine-700">
                  <IconPin className="h-3.5 w-3.5" /> Urbano y rural
                </span>
              </div>
              <a
                href={`tel:+${CENTRAL_WA}`}
                className="mt-6 inline-flex items-center gap-2.5 font-display text-[17px] font-bold text-pine-800 transition-colors hover:text-gold-600"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-pine-900 text-gold-300">
                  <IconPhone className="h-4 w-4" />
                </span>
                ¿Prefieres hablar? Llama a la central: {CENTRAL_PHONE}
              </a>
            </Reveal>
          </div>

          {/* formulario */}
          <Reveal dir="right" delay={150} className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              className="relative rounded-xl bg-pine-900 p-7 text-paper shadow-2xl shadow-pine-900/30 ring-1 ring-pine-700 sm:p-9"
            >
              <span
                aria-hidden
                className="absolute -top-3 left-8 rounded-full bg-gold-400 px-4 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-pine-950 shadow-lg"
              >
                Gratis para el cliente
              </span>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="r-nombre" className={label}>Tu nombre</label>
                  <input
                    id="r-nombre"
                    className={field}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="p. ej. Juana Pérez"
                  />
                </div>
                <div>
                  <label htmlFor="r-tel" className={label}>Teléfono para llamarte</label>
                  <input
                    id="r-tel"
                    type="tel"
                    className={field}
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="963 000 0000"
                  />
                </div>
                <div>
                  <label htmlFor="r-oficio" className={label}>¿Qué necesitas?</label>
                  <select
                    id="r-oficio"
                    className={field}
                    value={oficio}
                    onChange={(e) => setOficio(e.target.value)}
                  >
                    {OFICIOS_REQ.map((o) => (
                      <option key={o} value={o} className="bg-pine-900">
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="r-col" className={label}>Colonia o ejido</label>
                  <input
                    id="r-col"
                    className={field}
                    value={colonia}
                    onChange={(e) => setColonia(e.target.value)}
                    placeholder="p. ej. Ejido Santa Elena"
                  />
                </div>
              </div>

              <div className="mt-5">
                <span className={label}>¿Qué tan urgente es?</span>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Urgencia">
                  {URGENCIAS.map((u) => (
                    <button
                      key={u}
                      type="button"
                      aria-pressed={urgencia === u}
                      onClick={() => setUrgencia(u)}
                      className={cn(
                        "rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all duration-300",
                        urgencia === u
                          ? "bg-gold-400 text-pine-950 shadow-md shadow-gold-500/25"
                          : "text-paper/65 ring-1 ring-paper/20 hover:-translate-y-0.5 hover:text-gold-300 hover:ring-gold-400/50"
                      )}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="r-detalle" className={label}>Cuéntanos más (opcional)</label>
                <textarea
                  id="r-detalle"
                  rows={3}
                  className={cn(field, "resize-none")}
                  value={detalle}
                  onChange={(e) => setDetalle(e.target.value)}
                  placeholder="p. ej. hay una fuga en el patio desde ayer y ya se encharcó…"
                />
              </div>

              {error && (
                <p className="mt-4 animate-pop rounded-lg bg-coral/15 px-4 py-3 text-[13.5px] font-semibold text-coral ring-1 ring-coral/40">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-gold-400 px-6 py-4 text-[15.5px] font-bold text-pine-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-300 hover:shadow-xl hover:shadow-gold-500/25"
              >
                <IconWhatsapp className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" />
                Enviar mi solicitud por WhatsApp
                <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <p className="mt-4 text-center text-[12.5px] leading-relaxed text-paper/50">
                Al enviar, se abrirá WhatsApp con tu solicitud ya escrita: solo presionas
                «Enviar». No guardamos tus datos.
              </p>

              {lastUrl && (
                <div className="mt-5 animate-pop rounded-lg bg-jade-500/10 px-5 py-4 text-center ring-1 ring-jade-500/40">
                  <p className="text-[14px] font-semibold text-jade-300">
                    ¿No se abrió WhatsApp? Toca aquí para intentarlo de nuevo:
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center gap-2.5">
                    <a
                      href={lastUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-jade-500 px-5 py-2.5 text-[13px] font-bold text-pine-950 transition-all hover:-translate-y-0.5 hover:bg-jade-400"
                    >
                      Abrir WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={reset}
                      className="rounded-full border border-paper/25 px-5 py-2.5 text-[13px] font-semibold text-paper/75 transition-colors hover:border-gold-400 hover:text-gold-300"
                    >
                      Hacer otra solicitud
                    </button>
                  </div>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
