import SubjectLanding from "./SubjectLanding";
import { fashionPrograms } from "@/data/fashionData";
import type { SubjectData } from "./SubjectLanding";

const fashionData: SubjectData = {
  icon: "star",
  title: "Fashion",
  subtitle: "Fashion Design, Luxury Brand Management & Textile Design",
  heroImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80",
  whyAbroad: [
    "Study in fashion capitals: Milan, Paris, London — where the industry lives",
    "Direct access to Fashion Week, luxury houses, and top designers",
    "Italy & France offer specialised institutes not available in India",
    "Luxury brand management salaries: ₹80L-2Cr+ with experience",
    "Strong Indian textile heritage gives Indian students a unique edge",
  ],
  framework: [
    { s: "1", l: "Build Your Portfolio", d: "Sketching · Sewing basics · Design software (Illustrator, CLO 3D)" },
    { s: "2", l: "Choose Specialisation", d: "Fashion Design · Luxury Management · Textile Design · Styling" },
    { s: "3", l: "Shortlist Countries", d: "Italy/France for design · UK for business · USA for innovation" },
    { s: "4", l: "Prepare Application", d: "Portfolio (15-20 pieces) · IELTS 6.0+ · SOP · LORs" },
    { s: "5", l: "Intern & Launch", d: "Fashion Week internships · Brand collaborations · Launch label" },
  ],
  programs: fashionPrograms.map(p => ({
    ...p,
    level: p.level as string,
    licensing: Array.isArray(p.licensing) ? p.licensing : typeof p.licensing === "string" ? [p.licensing] : [],
  })),
};

export default function FashionLanding() {
  return <SubjectLanding data={fashionData} />;
}
