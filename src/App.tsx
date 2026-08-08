import { ShareButton } from "./componentes/ShareButton"
import { useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Proof from "./components/Proof";
import Showcase from "./components/Showcase";
import RequestForm from "./components/RequestForm";
import Journey from "./components/Journey";
import Voices from "./components/Voices";
import Pricing from "./components/Pricing";
import Faq from "./components/Faq";
import { CtaBand, Footer } from "./components/Outro";
import { InstallGuide, InstallPill, useInstallPrompt } from "./components/Install";
import Central from "./components/Central";

export default function App() {
  const install = useInstallPrompt();
  const [centralOpen, setCentralOpen] = useState(false);

  return (
    <div className="noise min-h-screen bg-pine-950 font-sans text-paper">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold-400 focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-pine-950"
      >
        Saltar al contenido
      </a>
      <Nav onCentral={() => setCentralOpen(true)} />
      <main id="contenido">
        <Hero />
        <Proof />
        <Showcase />
        <RequestForm />
        <Journey />
        <Voices />
        <Pricing />
        <Faq />
        <CtaBand />
        <InstallGuide install={install} />
      </main>
      <Footer onCentral={() => setCentralOpen(true)} />
      <InstallPill install={install} />
      <Central open={centralOpen} onClose={() => setCentralOpen(false)} />
      <ShareButton />
    </div>
  );
}
