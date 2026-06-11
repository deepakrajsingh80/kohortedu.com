import SubjectLanding from "./SubjectLanding";
import { medPrograms, medJourneySteps } from "@/data/medicineData";
import type { SubjectData } from "./SubjectLanding";

/* Convert medPrograms to SubjectData format */
const medicineData: SubjectData = {
  icon: "stethoscope",
  title: "Medicine",
  subtitle: "MBBS, MD, Nursing, Dentistry, Pharmacy & Public Health",
  heroImage: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80",
  whyAbroad: [
    "Access world-class medical infrastructure and research facilities",
    "FMG-friendly pathways: Russia, Georgia, Philippines from ₹3L/yr",
    "Nursing = fastest PR pathway — Canada in 6 months",
    "USA MD graduates earn $200K-400K+ — highest paid profession",
    "Global healthcare shortage — jobs guaranteed in most countries",
  ],
  framework: medJourneySteps.slice(0, 4).map((s, i) => ({
    s: String(i + 1),
    l: s.q.replace("?", ""),
    d: s.options.map(o => o.label).join(" · "),
  })),
  programs: medPrograms.map(p => ({
    id: p.id,
    title: p.title,
    level: p.id === "nursing" || p.id === "dentistry" ? "UG" : p.id === "mph" ? "PG" : "UG/PG",
    duration: p.duration,
    avgTuition: p.avgTuition,
    description: p.description,
    whoFor: p.whoFor,
    eligibility: p.eligibility,
    countries: p.countries.map(c => ({
      name: c.name,
      tuition: c.tuition,
      salary: c.salary,
      exam: c.exam,
      pr: c.pr,
    })),
    careers: p.careers.map(c => ({
      role: c.role,
      usa: c.usa,
      uk: c.uk || "N/A",
      canada: c.canada || "N/A",
      aus: c.aus || "N/A",
    })),
    licensing: Array.isArray(p.licensing)
      ? p.licensing.map((l: any) => `${l.country}: ${l.exam}`)
      : typeof p.licensing === "string" ? p.licensing : [],
  })),
};

export default function MedicineLanding() {
  return <SubjectLanding data={medicineData} />;
}
