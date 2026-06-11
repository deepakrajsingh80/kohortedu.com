import SubjectLanding from "./SubjectLanding";
import { hotelPrograms } from "@/data/hotelData";
import type { SubjectData } from "./SubjectLanding";

const hotelData: SubjectData = {
  icon: "star",
  title: "Hotel Management",
  subtitle: "Hospitality, Culinary Arts & Tourism Management",
  heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80",
  whyAbroad: [
    "Train at world-renowned hospitality schools in Switzerland & France",
    "Mandatory internships at 5-star hotel chains (Marriott, Hilton, Oberoi)",
    "Tax-free salaries in UAE: AED 150K-400K+ for hotel managers",
    "Canada & Australia offer fast PR pathways for hospitality graduates",
    "Global industry — work in any country with transferable skills",
  ],
  framework: [
    { s: "1", l: "Build Soft Skills", d: "Communication · Customer service · Language basics · Grooming" },
    { s: "2", l: "Choose Track", d: "Hotel Operations · Culinary Arts · Tourism · Event Management" },
    { s: "3", l: "Pick Destination", d: "Switzerland for prestige · UAE for tax-free · Canada for PR" },
    { s: "4", l: "Apply & Intern", d: "IELTS 6.0+ · Interview · Intern at luxury chain · Build network" },
    { s: "5", l: "Launch Career", d: "Management trainee → Department head → GM → Regional Director" },
  ],
  programs: hotelPrograms.map(p => ({
    ...p,
    level: p.level as string,
    licensing: Array.isArray(p.licensing) ? p.licensing : typeof p.licensing === "string" ? [p.licensing] : [],
  })),
};

export default function HotelLanding() {
  return <SubjectLanding data={hotelData} />;
}
