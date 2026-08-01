import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";

/* ---------- reduced motion ---------- */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* ---------- in-view ---------- */
export function useInView<T extends HTMLElement>(rootMargin = "0px 0px -10% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}

/* ---------- Reveal ---------- */
export function Reveal({
  children,
  className,
  delay = 0,
  dir = "up",
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  dir?: "up" | "left" | "right" | "none";
  style?: CSSProperties;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const hidden =
    dir === "left"
      ? "-translate-x-10"
      : dir === "right"
        ? "translate-x-10"
        : dir === "up"
          ? "translate-y-8"
          : "";
  return (
    <div
      ref={ref}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)] will-change-transform",
        inView ? "translate-x-0 translate-y-0 opacity-100" : cn("opacity-0", hidden),
        className
      )}
    >
      {children}
    </div>
  );
}

/* ---------- CountUp ---------- */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1700,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {v.toLocaleString("es-MX")}
      {suffix}
    </span>
  );
}

/* ---------- ScrambleWords ---------- */
const CHARS = "abcdefghjkmnñpqrstuvwxyz#%*+=·";

export function ScrambleWords({
  words,
  interval = 2600,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState(words[0]);
  const wordsRef = useRef(words);
  wordsRef.current = words;

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % wordsRef.current.length), interval);
    return () => clearInterval(t);
  }, [interval]);

  useEffect(() => {
    const target = wordsRef.current[i];
    if (reduced) {
      setTxt(target);
      return;
    }
    let frame = 0;
    const total = 16;
    const id = setInterval(() => {
      frame++;
      const settled = Math.floor((frame / total) * target.length);
      let out = target.slice(0, settled);
      for (let k = settled; k < target.length; k++) {
        out += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setTxt(out);
      if (frame >= total) {
        setTxt(target);
        clearInterval(id);
      }
    }, 42);
    return () => clearInterval(id);
  }, [i, reduced]);

  return (
    <span className={cn("inline-block", className)} aria-label={words[i]}>
      {txt}
    </span>
  );
}
