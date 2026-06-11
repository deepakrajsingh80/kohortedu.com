import SubjectLanding from "./SubjectLanding";
import { journalismPrograms } from "@/data/journalismData";
import type { SubjectData } from "./SubjectLanding";

const journalismData: SubjectData = {
  icon: "star",
  title: "Journalism",
  subtitle: "News Reporting, Digital Media & Public Relations",
  heroImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80",
  whyAbroad: [
    "Access to top media organisations: BBC, CNN, Reuters, Al Jazeera",
    "Study press freedom, investigative techniques, and digital storytelling",
    "Strong demand for bilingual journalists in Europe & Middle East",
    "Digital media skills: content strategy, SEO, social media management",
    "UK has the world's most respected journalism schools",
  ],
  framework: [
    { s: "1", l: "Build Writing Skills", d: "Blogging · Reporting · Editing · Fact-checking · AP style" },
    { s: "2", l: "Choose Medium", d: "Print · Broadcast · Digital · Investigative · PR & Corporate" },
    { s: "3", l: "Pick Region", d: "UK for credibility · USA for scale · Canada for PR pathway" },
    { s: "4", l: "Create Portfolio", d: "Writing samples · Published articles · Podcast/Video clips · IELTS 6.5+" },
    { s: "5", l: "Enter Industry", d: "Intern at newsroom → Reporter → Editor → Bureau Chief / Founder" },
  ],
  programs: journalismPrograms.map(p => ({
    ...p,
    level: p.level as string,
    licensing: Array.isArray(p.licensing) ? p.licensing : typeof p.licensing === "string" ? [p.licensing] : [],
  })),
};

export default function JournalismLanding() {
  return <SubjectLanding data={journalismData} />;
}
