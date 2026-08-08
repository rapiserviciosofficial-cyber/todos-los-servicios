import { useState } from "react";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const title = "Todos los Servicios - Las Margaritas";
    const text = "Descubre los mejores servicios en Las Margaritas, Chiapas";

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        console.log("Error al compartir:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.log("Error al copiar:", err);
      }
    }
  };

  return (
    <>
      <button
        onClick={handleShare}
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-pine-950 shadow-xl shadow-pine-950/30 transition-all duration-300 hover:-translate-y-1 hover:bg-gold-300 hover:shadow-2xl"
        aria-label="Compartir sitio"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>

      {copied && (
        <div className="fixed bottom-24 left-6 z-50 rounded-lg bg-pine-950 px-4 py-2 text-[13px] font-semibold text-gold-300 shadow-lg">
          ¡Enlace copiado! 
        </div>
      )}
    </>
  );
}
