import SubjectLanding from "./SubjectLanding";
import { filmsPrograms } from "@/data/filmsData";
import type { SubjectData } from "./SubjectLanding";

const filmsData: SubjectData = {
  icon: "star",
  title: "Films & Media",
  subtitle: "Film Production, Animation, VFX & Screenwriting",
  heroImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80",
  whyAbroad: [
    "Train at institutes connected to Hollywood, Bollywood, and Netflix",
    "Access to professional studios, RED cameras, and editing suites",
    "VFX & Animation: Canada, USA, UK are global hubs (Marvel, Pixar, Weta)",
    "Streaming boom: Netflix, Amazon, Disney+ hiring creators worldwide",
    "O-1 visa (Extraordinary Ability) available for talented filmmakers in USA",
  ],
  framework: [
    { s: "1", l: "Develop Craft", d: "Short films · Scripts · Camera work · Editing · Build showreel" },
    { s: "2", l: "Choose Specialisation", d: "Direction · Cinematography · VFX · Animation · Screenwriting" },
    { s: "3", l: "Pick Film Hub", d: "USA for Hollywood · UK for indie · Canada for VFX/PR · France for arthouse" },
    { s: "4", l: "Build Portfolio", d: "Showreel (3-5 mins) · Scripts · Festival entries · IELTS 6.5+" },
    { s: "5", l: "Break Into Industry", d: "PA → Assistant → Specialist → Department Head → Director/Showrunner" },
  ],
  programs: filmsPrograms.map(p => ({
    ...p,
    level: p.level as string,
    licensing: Array.isArray(p.licensing) ? p.licensing : typeof p.licensing === "string" ? [p.licensing] : [],
  })),
};

export default function FilmsLanding() {
  return <SubjectLanding data={filmsData} />;
}
