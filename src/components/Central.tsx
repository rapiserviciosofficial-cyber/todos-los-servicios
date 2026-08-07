import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { cn } from "../utils/cn";
import { CENTRAL_PHONE } from "../data";
import { IconArrow, IconCheck, IconDoc, IconPhone, IconPlus, IconWhatsapp } from "./icons";

/* ---------- datos del gremio ---------- */
type Pro = { id: string; name: string; oficio: string };

const PROFESSIONALS: Pro[] = [
  { id: "elec", name: "Servicios Eléctricos Ramírez", oficio: "Electricidad" },
  { id: "plom", name: "Hnos. López", oficio: "Plomería" },
  { id: "carp", name: "Carpintería San José", oficio: "Carpintería" },
  { id: "herr", name: "Herrería El Volcán", oficio: "Herrería" },
  { id: "mec", name: "Chema Robles", oficio: "Mecánica" },
  { id: "alb", name: "Don Aurelio Díaz", oficio: "Albañilería" },
  { id: "viv", name: "Vivero Las Flores", oficio: "Jardinería" },
  { id: "barb", name: "Barbería Don Fede", oficio: "Belleza" },
  { id: "est", name: "Estudio Andrea", oficio: "Belleza" },
  { id: "tex1", name: "Telar de Rosa", oficio: "Bordados" },
  { id: "tex2", name: "Colectivo Telar Vivo", oficio: "Bordados" },
  { id: "cafe1", name: "Café Sierra Verde", oficio: "Café" },
  { id: "cafe2", name: "Doña Marta Cortés", oficio: "Café" },
  { id: "pan", name: "Panadería La Espiga", oficio: "Panadería" },
];

const OFICIOS = [
  "Plomería",
  "Electricidad",
  "Carpintería",
  "Herrería",
  "Mecánica",
  "Albañilería",
  "Jardinería",
  "Belleza",
  "Bordados",
  "Café",
  "Panadería",
  "Otro",
];

const SUGGEST: Record<string, string> = {
  Plomería: "plom",
  Electricidad: "elec",
  Carpintería: "carp",
  Herrería: "herr",
  Mecánica: "mec",
  Albañilería: "alb",
  Jardinería: "viv",
  Belleza: "barb",
  Bordados: "tex1",
  Café: "cafe1",
  Panadería: "pan",
};

type Status = "pendiente" | "transferida" | "completada";

type CallRecord = {
  id: string;
  client: string;
  phone: string;
  oficio: string;
  colonia: string;
  note: string;
  assigned: string;
  status: Status;
  at: string;
};

const STATUS_META: Record<Status, { label: string; cls: string; next: Status; action: string }> = {
  pendiente: {
    label: "Pendiente",
    cls: "bg-gold-200 text-gold-600",
    next: "transferida",
    action: "Marcar transferida",
  },
  transferida: {
    label: "Transferida",
    cls: "bg-jade-100 text-pine-700",
    next: "completada",
    action: "Marcar completada",
  },
  completada: {
    label: "Completada",
    cls: "bg-pine-800 text-gold-300",
    next: "pendiente",
    action: "Reabrir",
  },
};

/* ---------- textos listos para WhatsApp Business ---------- */
const WA_PROFILE = `Nombre: Todos los Servicios — Las Margaritas
Categoría: Servicios de mantenimiento
Atención: En línea 24/7
Descripción: Central que te conecta con plomeros, electricistas, carpinteros, bordadoras y más de 40 oficios verificados del municipio. Precios claros y trato de vecinos.`;

const WA_GREETING = `¡Hola! 👋 Bienvenido a *Todos los Servicios*, la central del talento de Las Margaritas.
Cuéntanos qué necesitas (plomero, electricista, carpintero, bordados…) y tu colonia, y en un momento te pasamos con el oficio indicado. ✳`;

const WA_AWAY = `¡Hola! Gracias por escribir a *Todos los Servicios*. 🌙
Nuestra Oficina Gestora atiende en línea 24/7.
Déjanos tu nombre, tu colonia y el oficio que necesitas, y te ayudamos a canalizarlo con el servicio indicado. ✳`;

const WA_QUICK = `¡Claro que sí! Para cotizar rápido necesito:
1️⃣ Tu nombre
2️⃣ Colonia o ejido
3️⃣ Qué necesitas
4️⃣ ¿Para cuándo lo ocupas?
Con eso te paso directo con el técnico. 🙌`;

function CopyBlock({
  label,
  text,
  copied,
  onCopy,
}: {
  label: string;
  text: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="rounded-lg border border-ink/10 bg-paper p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-pine-700">
          {label}
        </p>
        <button
          type="button"
          onClick={onCopy}
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold transition-all duration-300",
            copied
              ? "bg-jade-500 text-pine-950"
              : "bg-pine-900 text-gold-300 hover:-translate-y-0.5 hover:bg-pine-800"
          )}
        >
          {copied && <IconCheck className="h-3 w-3" />}
          {copied ? "¡Copiado!" : "Copiar"}
        </button>
      </div>
      <p className="mt-2.5 whitespace-pre-line text-[13px] leading-relaxed text-ink/75">{text}</p>
    </div>
  );
}

/* ---------- utilidades ---------- */
function normalizeMx(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.length === 10) d = "52" + d;
  return d;
}
const telHref = (raw: string) => `tel:+${normalizeMx(raw)}`;
const waHref = (raw: string) => `https://wa.me/${normalizeMx(raw)}`;

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function timeLabel(iso: string) {
  const d = new Date(iso);
  const hoy = new Date().toDateString() === d.toDateString();
  const hora = d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
  return hoy ? hora : `${d.toLocaleDateString("es-MX", { day: "numeric", month: "short" })} · ${hora}`;
}

const inputCls =
  "w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 transition-all duration-300 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-400/40";
const labelCls = "mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/55";

/* ---------- componente principal ---------- */
export default function Central({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<"registrar" | "llamadas" | "directorio" | "config">("registrar");
  const [records, setRecords] = useState<CallRecord[]>(() => load("tls-llamadas", []));
  const [phones, setPhones] = useState<Record<string, string>>(() => load("tls-telefonos", {}));
  const [toast, setToast] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const clientRef = useRef<HTMLInputElement>(null);

  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(key);
    setTimeout(() => setCopied((c) => (c === key ? null : c)), 2200);
  };

  const [client, setClient] = useState("");
  const [phone, setPhone] = useState("");
  const [oficio, setOficio] = useState(OFICIOS[0]);
  const [colonia, setColonia] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    localStorage.setItem("tls-llamadas", JSON.stringify(records));
  }, [records]);
  useEffect(() => {
    localStorage.setItem("tls-telefonos", JSON.stringify(phones));
  }, [phones]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const today = useMemo(() => {
    const hoy = new Date().toDateString();
    return records.filter((r) => new Date(r.at).toDateString() === hoy);
  }, [records]);

  const counts = {
    hoy: today.length,
    pendiente: records.filter((r) => r.status === "pendiente").length,
    transferida: records.filter((r) => r.status === "transferida").length,
    completada: records.filter((r) => r.status === "completada").length,
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!client.trim() || !phone.trim()) {
      setToast("Faltan el nombre o el teléfono del cliente.");
      return;
    }
    const rec: CallRecord = {
      id: (crypto.randomUUID?.() ?? String(Date.now() + Math.random())),
      client: client.trim(),
      phone: phone.trim(),
      oficio,
      colonia: colonia.trim(),
      note: note.trim(),
      assigned: SUGGEST[oficio] ?? "",
      status: "pendiente",
      at: new Date().toISOString(),
    };
    setRecords((prev) => [rec, ...prev]);
    setClient("");
    setPhone("");
    setColonia("");
    setNote("");
    setOficio(OFICIOS[0]);
    setToast("Llamada registrada. Ya puedes transferirla al técnico.");
    setTab("llamadas");
  };

  const patch = (id: string, changes: Partial<CallRecord>) =>
    setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, ...changes } : r)));

  const remove = (id: string) => setRecords((prev) => prev.filter((r) => r.id !== id));

  const transfer = (r: CallRecord) => {
    const num = phones[r.assigned];
    if (!num) {
      setTab("directorio");
      setToast("Primero guarda el número del técnico en el Directorio.");
      return;
    }
    if (r.status === "pendiente") patch(r.id, { status: "transferida" });
    window.location.href = telHref(num);
  };

  const proName = (id: string) => PROFESSIONALS.find((p) => p.id === id)?.name ?? "Sin asignar";

  return (
    <>
      {/* backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[80] bg-pine-950/75 backdrop-blur-sm transition-opacity duration-400",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Central de llamadas"
        className={cn(
          "fixed inset-y-0 right-0 z-[85] flex w-full max-w-xl flex-col bg-paper text-ink shadow-2xl shadow-pine-950 transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)]",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* header */}
        <header className="flex items-center justify-between gap-4 bg-pine-950 px-6 py-5 text-paper">
          <div className="flex items-center gap-3.5">
            <span className="relative grid h-11 w-11 place-items-center rounded-full bg-gold-400 text-pine-950">
              <IconPhone className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 h-3 w-3 animate-pulse-dot rounded-full bg-jade-400 ring-2 ring-pine-950" />
            </span>
            <div className="leading-none">
              <p className="font-display text-lg font-bold tracking-tight">Central de llamadas</p>
              <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.22em] text-jade-300">
                Línea {CENTRAL_PHONE} · en línea
              </p>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar central"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-paper/20 text-paper/70 transition-all hover:rotate-90 hover:border-gold-400 hover:text-gold-300"
          >
            <IconPlus className="h-4 w-4 rotate-45" />
          </button>
        </header>

        {/* stats */}
        <div className="grid grid-cols-4 gap-px border-b border-ink/10 bg-ink/10">
          {[
            { n: counts.hoy, l: "hoy" },
            { n: counts.pendiente, l: "pendientes" },
            { n: counts.transferida, l: "transferidas" },
            { n: counts.completada, l: "completadas" },
          ].map((s) => (
            <div key={s.l} className="bg-paper px-3 py-3 text-center">
              <p className="font-display text-2xl font-extrabold leading-none text-pine-800">{s.n}</p>
              <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink/50">{s.l}</p>
            </div>
          ))}
        </div>

        {/* tabs */}
        <div className="flex gap-1.5 border-b border-ink/10 px-4 pt-3" role="tablist" aria-label="Secciones de la central">
          {(
            [
              { id: "registrar", label: "Registrar" },
              { id: "llamadas", label: `Llamadas${records.length ? ` · ${records.length}` : ""}` },
              { id: "directorio", label: "Directorio" },
              { id: "config", label: "Config." },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "rounded-t-lg border-b-2 px-4 py-2.5 text-[13.5px] font-semibold transition-all duration-300",
                tab === t.id
                  ? "border-gold-500 bg-white text-pine-800"
                  : "border-transparent text-ink/50 hover:bg-white/60 hover:text-pine-800"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* body */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          {/* ---- registrar ---- */}
          {tab === "registrar" && (
            <form onSubmit={onSubmit} className="space-y-4">
              <button
                type="button"
                onClick={() => {
                  setNote("Llamada perdida · devolver llamada");
                  clientRef.current?.focus();
                  setToast("Nota lista: solo escribe nombre y teléfono.");
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gold-500/70 bg-gold-200/40 px-4 py-3 text-[13px] font-bold text-gold-600 transition-all duration-300 hover:bg-gold-200"
              >
                <IconPhone className="h-4 w-4" />
                ¿Llamada perdida? Toca aquí y regístrala en 10 segundos
              </button>
              <p className="rounded-lg bg-jade-100 px-4 py-3 text-[13.5px] leading-snug text-pine-800">
                Entró una llamada a la central: registra quién es y qué necesita. Al
                guardar, el sistema sugiere al técnico adecuado.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-cliente" className={labelCls}>Nombre del cliente</label>
                  <input
                    id="c-cliente"
                    ref={clientRef}
                    className={inputCls}
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="p. ej. Juana Pérez"
                  />
                </div>
                <div>
                  <label htmlFor="c-tel" className={labelCls}>Teléfono del cliente</label>
                  <input
                    id="c-tel"
                    type="tel"
                    className={inputCls}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="963 000 0000"
                  />
                </div>
                <div>
                  <label htmlFor="c-oficio" className={labelCls}>¿Qué oficio necesita?</label>
                  <select
                    id="c-oficio"
                    className={inputCls}
                    value={oficio}
                    onChange={(e) => setOficio(e.target.value)}
                  >
                    {OFICIOS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="c-col" className={labelCls}>Colonia / ejido</label>
                  <input
                    id="c-col"
                    className={inputCls}
                    value={colonia}
                    onChange={(e) => setColonia(e.target.value)}
                    placeholder="p. ej. Col. El Carmen"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="c-nota" className={labelCls}>Nota rápida (opcional)</label>
                <textarea
                  id="c-nota"
                  rows={2}
                  className={cn(inputCls, "resize-none")}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="p. ej. fuga en el patio, urge antes de las 5"
                />
              </div>
              {SUGGEST[oficio] && (
                <p className="flex items-center gap-2 rounded-lg bg-gold-200/60 px-4 py-2.5 text-[13px] font-semibold text-gold-600">
                  <IconArrow className="h-4 w-4" />
                  Sugerido: {proName(SUGGEST[oficio])}
                </p>
              )}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-pine-900 px-6 py-4 text-[15px] font-bold text-gold-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-pine-800 hover:shadow-xl hover:shadow-pine-900/25"
              >
                <IconPhone className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" />
                Registrar llamada
              </button>
            </form>
          )}

          {/* ---- llamadas ---- */}
          {tab === "llamadas" && (
            <div className="space-y-4">
              {records.length === 0 ? (
                <div className="rounded-xl border border-dashed border-ink/20 px-6 py-14 text-center">
                  <IconPhone className="mx-auto h-8 w-8 text-ink/25" />
                  <p className="mt-3 font-display text-lg font-bold text-ink/60">Aún no hay llamadas registradas</p>
                  <p className="mt-1 text-[13.5px] text-ink/45">
                    Cuando entre una llamada a tu número, regístrala en la pestaña anterior.
                  </p>
                </div>
              ) : (
                records.map((r) => {
                  const meta = STATUS_META[r.status];
                  const tecNum = phones[r.assigned];
                  return (
                    <article
                      key={r.id}
                      className="animate-pop rounded-xl border border-ink/10 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/50 hover:shadow-lg hover:shadow-pine-900/10"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-display text-[17px] font-bold text-pine-800">{r.client}</h4>
                          <p className="mt-0.5 font-mono text-[11px] text-ink/50">
                            {timeLabel(r.at)}
                            {r.colonia && <> · {r.colonia}</>}
                          </p>
                        </div>
                        <span className={cn("rounded-full px-3 py-1 text-[11px] font-bold", meta.cls)}>
                          {meta.label}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-paper-2 px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-pine-700">
                          {r.oficio}
                        </span>
                        {r.note && (
                          <span className="rounded-full bg-paper-2 px-3 py-1 text-[12px] italic text-ink/60">
                            “{r.note}”
                          </span>
                        )}
                      </div>

                      <div className="mt-4">
                        <label className={cn(labelCls, "mb-1")} htmlFor={`asig-${r.id}`}>
                          Técnico asignado
                        </label>
                        <select
                          id={`asig-${r.id}`}
                          value={r.assigned}
                          onChange={(e) => patch(r.id, { assigned: e.target.value })}
                          className={cn(inputCls, "py-2.5 text-[14px]")}
                        >
                          <option value="">— Elegir manualmente —</option>
                          {PROFESSIONALS.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} · {p.oficio}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <a
                          href={telHref(r.phone)}
                          className="inline-flex items-center gap-1.5 rounded-full border-2 border-pine-800 px-4 py-2 text-[12.5px] font-bold text-pine-800 transition-all hover:bg-pine-800 hover:text-gold-300"
                        >
                          <IconPhone className="h-3.5 w-3.5" /> Llamar cliente
                        </a>
                        <a
                          href={waHref(r.phone)}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`WhatsApp al cliente ${r.client}`}
                          className="grid h-9 w-9 place-items-center rounded-full text-jade-500 ring-1 ring-ink/15 transition-all hover:scale-110 hover:bg-jade-500 hover:text-white"
                        >
                          <IconWhatsapp className="h-4 w-4" />
                        </a>
                        <button
                          type="button"
                          onClick={() => transfer(r)}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12.5px] font-bold transition-all duration-300",
                            tecNum
                              ? "bg-gold-400 text-pine-950 hover:-translate-y-0.5 hover:bg-gold-300 hover:shadow-md"
                              : "bg-ink/10 text-ink/50 hover:bg-gold-200 hover:text-gold-600"
                          )}
                        >
                          <IconArrow className="h-3.5 w-3.5" />
                          {tecNum ? `Transferir a ${proName(r.assigned).split(" ")[0]}` : "Transferir (falta número)"}
                        </button>
                        <div className="ml-auto flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => patch(r.id, { status: meta.next })}
                            className="rounded-full px-3 py-1.5 text-[11px] font-semibold text-ink/55 ring-1 ring-ink/15 transition-colors hover:text-pine-800 hover:ring-pine-800"
                          >
                            {meta.action}
                          </button>
                          <button
                            type="button"
                            onClick={() => remove(r.id)}
                            aria-label={`Eliminar registro de ${r.client}`}
                            className="grid h-7 w-7 place-items-center rounded-full text-ink/35 transition-colors hover:bg-coral/15 hover:text-coral"
                          >
                            <IconPlus className="h-3.5 w-3.5 rotate-45" />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}

              {records.length > 0 && (
                <div className="rounded-xl border border-dashed border-pine-700/40 bg-jade-100/50 px-5 py-4">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-pine-700">
                    Cómo transferir desde tu celular
                  </p>
                  <ol className="mt-2 space-y-1 text-[13px] leading-relaxed text-pine-800/80">
                    <li><strong>1.</strong> Con «Llamar cliente» contesta o marca al cliente.</li>
                    <li><strong>2.</strong> En la llamada, toca <strong>«Agregar llamada»</strong>.</li>
                    <li><strong>3.</strong> Con «Transferir» marca al técnico.</li>
                    <li><strong>4.</strong> Toca <strong>«Unir llamadas»</strong>: los tres quedan en conferencia y tú puedes colgar.</li>
                  </ol>
                </div>
              )}
            </div>
          )}

          {/* ---- directorio telefónico ---- */}
          {tab === "directorio" && (
            <div className="space-y-3">
              <p className="rounded-lg bg-gold-200/60 px-4 py-3 text-[13.5px] leading-snug text-gold-600">
                Guarda aquí el número de cada técnico (solo lo ves tú, en este equipo).
                Con eso el botón «Transferir» marca directo.
              </p>
              {PROFESSIONALS.map((p) => {
                const num = phones[p.id] ?? "";
                return (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 rounded-xl border border-ink/10 bg-white px-4 py-3 transition-all duration-300 hover:border-jade-500/50"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-pine-800 font-display text-[13px] font-bold text-gold-300">
                      {p.name[0]}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-bold text-pine-800">{p.name}</p>
                      <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/45">{p.oficio}</p>
                      <input
                        type="tel"
                        value={num}
                        onChange={(e) => setPhones((prev) => ({ ...prev, [p.id]: e.target.value }))}
                        placeholder="Número del técnico (10 dígitos)"
                        aria-label={`Número de ${p.name}`}
                        className="mt-1.5 w-full rounded-md border border-ink/15 bg-paper px-3 py-1.5 font-mono text-[13px] text-ink placeholder:font-sans placeholder:text-ink/30 focus:border-jade-500 focus:outline-none"
                      />
                    </div>
                    {num ? (
                      <a
                        href={telHref(num)}
                        aria-label={`Llamar a ${p.name}`}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-jade-500 text-pine-950 transition-all hover:scale-110 hover:bg-jade-400"
                      >
                        <IconPhone className="h-4 w-4" />
                      </a>
                    ) : (
                      <span className="h-10 w-10 shrink-0 rounded-full border border-dashed border-ink/25" />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ---- configuración ---- */}
          {tab === "config" && (
            <div className="space-y-5">
              {/* WhatsApp Business */}
              <article className="rounded-xl border border-ink/10 bg-white p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-jade-500/15 text-jade-500 ring-1 ring-jade-500/40">
                    <IconWhatsapp className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-display text-[16px] font-bold text-pine-800">
                      WhatsApp Business · 15 min
                    </h4>
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/45">
                      Gratis · mismo número {CENTRAL_PHONE}
                    </p>
                  </div>
                </div>
                <ol className="mt-4 space-y-1.5 text-[13.5px] leading-relaxed text-ink/70">
                  <li>
                    <strong className="text-pine-800">1.</strong> En tu WhatsApp actual:{" "}
                    <em>Ajustes → Chats → Copia de seguridad → Guardar</em> (por si las dudas).
                  </li>
                  <li>
                    <strong className="text-pine-800">2.</strong> Instala{" "}
                    <strong className="text-pine-800">WhatsApp Business</strong> (Play Store /
                    App Store) y registra el mismo número.
                  </li>
                  <li>
                    <strong className="text-pine-800">3.</strong> Completa el perfil y activa
                    los mensajes con estos textos, ya redactados:
                  </li>
                </ol>
                <div className="mt-3 space-y-3">
                  <CopyBlock
                    label="Perfil del negocio"
                    text={WA_PROFILE}
                    copied={copied === "perfil"}
                    onCopy={() => copy("perfil", WA_PROFILE)}
                  />
                  <CopyBlock
                    label="Mensaje de bienvenida"
                    text={WA_GREETING}
                    copied={copied === "bienvenida"}
                    onCopy={() => copy("bienvenida", WA_GREETING)}
                  />
                  <CopyBlock
                    label="Mensaje de ausencia (fuera de horario)"
                    text={WA_AWAY}
                    copied={copied === "ausencia"}
                    onCopy={() => copy("ausencia", WA_AWAY)}
                  />
                  <CopyBlock
                    label="Respuesta rápida · atajo «/cotizar»"
                    text={WA_QUICK}
                    copied={copied === "rapida"}
                    onCopy={() => copy("rapida", WA_QUICK)}
                  />
                </div>
                <p className="mt-3 rounded-lg bg-jade-100 px-4 py-2.5 text-[12.5px] leading-snug text-pine-800">
                  Se activan en <strong>WhatsApp Business → Herramientas para el negocio</strong>.
                  Como la Oficina Gestora atiende en línea 24/7, puedes dejar el mensaje de ausencia desactivado o usarlo solo para avisos especiales.
                </p>
              </article>

              {/* Llamadas perdidas */}
              <article className="rounded-xl border border-ink/10 bg-white p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-400/20 text-gold-600 ring-1 ring-gold-500/40">
                    <IconPhone className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-display text-[16px] font-bold text-pine-800">
                      Aviso de llamadas perdidas · 5 min
                    </h4>
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/45">
                      Tu compañía te avisa, tú devuelves la llamada
                    </p>
                  </div>
                </div>
                <ol className="mt-4 space-y-1.5 text-[13.5px] leading-relaxed text-ink/70">
                  <li>
                    <strong className="text-pine-800">1.</strong> Abre la app de tu compañía:{" "}
                    <strong className="text-pine-800">Mi Telcel, Mi AT&T o Mi Movistar</strong>.
                  </li>
                  <li>
                    <strong className="text-pine-800">2.</strong> Activa «Aviso de llamadas
                    perdidas» y el buzón: te llega un SMS en cuanto alguien no te localice.
                  </li>
                  <li>
                    <strong className="text-pine-800">3.</strong> Regístralas aquí con el botón
                    rápido de «Registrar» y devuélvelas el mismo día: una llamada devuelta es
                    un cliente que confía.
                  </li>
                </ol>
              </article>

              {/* Google Forms */}
              <article className="rounded-xl border border-ink/10 bg-white p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-pine-800/10 text-pine-700 ring-1 ring-pine-700/30">
                    <IconDoc className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-display text-[16px] font-bold text-pine-800">
                      Formulario de Google · 10 min
                    </h4>
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/45">
                      Respaldo por escrito de cada solicitud
                    </p>
                  </div>
                </div>
                <ol className="mt-4 space-y-1.5 text-[13.5px] leading-relaxed text-ink/70">
                  <li>
                    <strong className="text-pine-800">1.</strong> Crea tu formulario en{" "}
                    <strong className="text-pine-800">forms.new</strong> con tu cuenta de Google.
                  </li>
                  <li>
                    <strong className="text-pine-800">2.</strong> Título: «Solicitud de servicio
                    — Todos los Servicios», con estas preguntas:
                  </li>
                </ol>
                <ul className="ml-4 mt-2 space-y-1 border-l-2 border-gold-400/60 pl-4 text-[13px] text-ink/65">
                  <li>Nombre · <span className="font-mono text-[11px] text-ink/45">respuesta corta</span></li>
                  <li>Teléfono / WhatsApp · <span className="font-mono text-[11px] text-ink/45">respuesta corta</span></li>
                  <li>¿Qué oficio necesitas? · <span className="font-mono text-[11px] text-ink/45">desplegable</span></li>
                  <li>Colonia o ejido · <span className="font-mono text-[11px] text-ink/45">respuesta corta</span></li>
                  <li>¿Qué tan urgente? · <span className="font-mono text-[11px] text-ink/45">opción múltiple</span></li>
                  <li>Cuéntanos más · <span className="font-mono text-[11px] text-ink/45">párrafo</span></li>
                </ul>
                <ol className="mt-3 space-y-1.5 text-[13.5px] leading-relaxed text-ink/70" start={3}>
                  <li>
                    <strong className="text-pine-800">3.</strong> En Configuración activa{" "}
                    <strong className="text-pine-800">«Recibir notificaciones por correo»</strong>:
                    te avisa al instante de cada solicitud.
                  </li>
                  <li>
                    <strong className="text-pine-800">4.</strong> Pásame el enlace y conecto el
                    botón del sitio a tu formulario. Mientras tanto, el formulario del sitio ya
                    te manda todo ordenado por WhatsApp.
                  </li>
                </ol>
                <a
                  href="https://forms.new"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-jade-500 px-5 py-2.5 text-[13px] font-bold text-pine-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-jade-400"
                >
                  Crear mi formulario en Google <IconArrow className="h-3.5 w-3.5" />
                </a>
              </article>
            </div>
          )}
        </div>

        {/* toast */}
        <div
          aria-live="polite"
          className={cn(
            "pointer-events-none absolute inset-x-5 bottom-5 transition-all duration-400",
            toast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          )}
        >
          {toast && (
            <p className="rounded-lg bg-pine-950 px-5 py-3.5 text-center text-[13.5px] font-semibold text-gold-300 shadow-2xl">
              {toast}
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
