type P = { className?: string };

const base = (className?: string) => ({
  className,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

/* Marca: asterisco-margarita de 8 rayos */
export function AsterFlower({ className }: P) {
  return (
    <svg {...base(className)} strokeWidth={2.6}>
      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
    </svg>
  );
}

export function IconStar({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.6l2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 16.9 6.3 20l1.2-6.3L2.8 9.3l6.4-.8L12 2.6z" />
    </svg>
  );
}

export function IconSeal({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M12 2.8l2.1 1.5 2.5-.4 1 2.3 2.3 1-.4 2.5L21 12l-1.5 2.1.4 2.5-2.3 1-1 2.3-2.5-.4L12 21l-2.1-1.5-2.5.4-1-2.3-2.3-1 .4-2.5L3 12l1.5-2.1-.4-2.5 2.3-1 1-2.3 2.5.4L12 3z" />
      <path d="M8.8 12.2l2.2 2.2 4.2-4.6" />
    </svg>
  );
}

export function IconPin({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M12 21s-6.5-5.4-6.5-10A6.5 6.5 0 0 1 12 4.5 6.5 6.5 0 0 1 18.5 11c0 4.6-6.5 10-6.5 10z" />
      <circle cx="12" cy="11" r="2.3" />
    </svg>
  );
}

export function IconArrow({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function IconCheck({ className }: P) {
  return (
    <svg {...base(className)} strokeWidth={2.4}>
      <path d="M5 13l4.2 4.2L19 7" />
    </svg>
  );
}

export function IconPlus({ className }: P) {
  return (
    <svg {...base(className)} strokeWidth={2.2}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconSearch({ className }: P) {
  return (
    <svg {...base(className)}>
      <circle cx="11" cy="11" r="6.2" />
      <path d="M19.8 19.8l-4.2-4.2" />
    </svg>
  );
}

export function IconChat({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h-.5A2.5 2.5 0 0 1 4 13.5v-7z" />
      <path d="M8.5 10h7M8.5 12.8h4.5" />
    </svg>
  );
}

export function IconShield({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M12 3l7.5 2.8v5.4c0 4.6-3 8-7.5 9.8-4.5-1.8-7.5-5.2-7.5-9.8V5.8L12 3z" />
      <path d="M8.8 11.8l2.3 2.3 4.1-4.6" />
    </svg>
  );
}

export function IconPeso({ className }: P) {
  return (
    <svg {...base(className)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 6.8v10.4" />
      <path d="M15.2 8.9c-.7-.9-2-1.3-3.2-1.3-1.6 0-2.9.8-2.9 2.1 0 2.9 6.4 1.3 6.4 4.3 0 1.4-1.5 2.2-3.3 2.2-1.4 0-2.8-.5-3.5-1.5" />
    </svg>
  );
}

export function IconClock({ className }: P) {
  return (
    <svg {...base(className)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function IconLeaf({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M5 19C5 9 12 4.5 20 4c.5 8-4 15-14 15h-1z" />
      <path d="M5 19c3-5.5 7-9.5 11-11.5" />
    </svg>
  );
}

export function IconWrench({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M14.5 6.5a4 4 0 0 0-5.4 4.9L3.5 17a2 2 0 1 0 2.8 2.8l5.6-5.6a4 4 0 0 0 4.9-5.4l-2.6 2.6-2.4-.7-.7-2.4 2.6-2.6.8.8z" />
    </svg>
  );
}

export function IconBolt({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M13 2.5L4.5 13.5H11L10 21.5l8.5-11H12l1-8z" />
    </svg>
  );
}

export function IconHammer({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M3.5 7.5L8 3l4 1.5L9.5 9 14 13.5l-3 3L3.5 9v-1.5z" />
      <path d="M12.5 12.5L19 19" />
    </svg>
  );
}

export function IconNeedle({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M19.5 4.5c-5 1-11 6.5-13.5 12.5" />
      <path d="M19.5 4.5c1 5-4.5 11-10.5 13.5" />
      <circle cx="18.5" cy="5.5" r="1.6" />
      <path d="M4 20l2-2" />
    </svg>
  );
}

export function IconMap({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M9 4.5L3.5 6.5v13L9 17.5l6 2 5.5-2v-13L15 6.5l-6-2z" />
      <path d="M9 4.5v13M15 6.5v13" />
    </svg>
  );
}

export function IconQuote({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4 12.5C4 8 6.8 5.3 10.5 4.5l.6 1.6C8.8 6.9 7.6 8.5 7.4 10c.3-.1.7-.2 1.1-.2 1.9 0 3.3 1.4 3.3 3.4 0 2.1-1.6 3.6-3.8 3.6C5.7 16.8 4 15 4 12.5zm9.5 0c0-4.5 2.8-7.2 6.5-8l.6 1.6c-2.3.8-3.5 2.4-3.7 3.9.3-.1.7-.2 1.1-.2 1.9 0 3.3 1.4 3.3 3.4 0 2.1-1.6 3.6-3.8 3.6-2.3 0-4-1.8-4-4.3z" />
    </svg>
  );
}

export function IconWhatsapp({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5z" />
      <path d="M9 8.5c-.5 2.5 3.5 6.5 6 6l.8-1.5-2-1.2-1 .7c-1-.5-1.8-1.3-2.3-2.3l.7-1-1.2-2-1 .5z" />
    </svg>
  );
}

export function IconPhone({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M6.8 3.5h2.4l1.4 3.8-1.9 1.5a12 12 0 0 0 6.5 6.5l1.5-1.9 3.8 1.4v2.4a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.8 5.7a2 2 0 0 1 2-2.2z" />
    </svg>
  );
}

export function IconMail({ className }: P) {
  return (
    <svg {...base(className)}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4.5 7.5l7.5 5.5 7.5-5.5" />
    </svg>
  );
}

export function IconFacebook({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 21v-7h2.6l.5-3h-3.1V9.1c0-.9.3-1.6 1.7-1.6h1.5V4.8c-.7-.1-1.6-.2-2.5-.2-2.6 0-4.2 1.5-4.2 4.1V11H7.5v3H10v7h3.5z" />
    </svg>
  );
}

export function IconInstagram({ className }: P) {
  return (
    <svg {...base(className)}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconDoc({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M7 3.5h7L18 7.5v13H7a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1z" />
      <path d="M14 3.5v4h4M9.5 12h5M9.5 15h5" />
    </svg>
  );
}

export function IconSmartphone({ className }: P) {
  return (
    <svg {...base(className)}>
      <rect x="7" y="2.8" width="10" height="18.4" rx="2.6" />
      <path d="M10.5 18.2h3" />
    </svg>
  );
}

export function IconShare({ className }: P) {
  return (
    <svg {...base(className)}>
      <path d="M12 3.5v11M12 3.5L8 7.5M12 3.5l4 4" />
      <path d="M6 11.5H5.5A1.5 1.5 0 0 0 4 13v6a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19v-6a1.5 1.5 0 0 0-1.5-1.5H18" />
    </svg>
  );
}

export function IconDots({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="12" cy="5" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="19" r="1.8" />
    </svg>
  );
}

export function IconTiktok({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14.5 3h2.3c.3 2.3 1.7 3.7 4 4v2.5c-1.5 0-2.9-.5-4-1.3v6.6a5.9 5.9 0 1 1-5.9-5.9c.3 0 .7 0 1 .1v2.7a3.2 3.2 0 1 0 2.3 3.1V3z" />
    </svg>
  );
}
